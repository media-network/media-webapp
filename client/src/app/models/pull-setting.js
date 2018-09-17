import request from 'services/graphql'

export const HEADER_FRAGMENT = `
  name,
  value
`
export const PULL_SETTING_FRAGMENT = `
  pullURL,
  allowedOrigins,
  headers {
    ${ HEADER_FRAGMENT }
  }
`
export default {
  async getPullSetting(token, identifier) {
    const body = await request(`
      query getProject($token: String!, $identifier: String!) {
        session(token: $token) {
          account {
            project(identifier: $identifier) {
              pullSetting {
                ${ PULL_SETTING_FRAGMENT }
              }
            }
          }
        }
      }
    `, { token, identifier })

    return body.session.account.project.pullSetting

  },
  async updatePullSetting(token, pullSetting) {
    /*
    regex to describes a pattern of character:
      \s* Find multi space, multi tab and multi newline
      [,\n+] Find any character between the brackets
    */
    const delimiter = /\s*[,\n+]\s*/
    const allowedOrigins = (pullSetting.allowedOrigins || '').trim().split(delimiter).filter(Boolean)
    const { identifier, ...pullSettingStruct } = pullSetting
    const body = await request(`
      query updateProject($pullSetting: PullSettingStruct!, $token: String!, $identifier: String!) {
        session(token: $token) {
          account {
            project(identifier: $identifier) {
              pullSetting {
                _update(pullSetting: $pullSetting) {
                  ${ PULL_SETTING_FRAGMENT }
                }
              }

            }
          }
        }
      }
    `, {
      token,
      identifier: pullSetting.identifier,
      pullSetting: { ...pullSettingStruct, allowedOrigins }
    })

    const updatedProject = body.session.account.project._update

    return {
      ...updatedProject,
      origins: updatedProject.origins.join('\n')
    }
  },
}