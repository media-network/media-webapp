/*
  regex to describes a pattern of character:
  \s* Find multi space, multi tab and multi newline
  [,\n+] Find any character between the brackets
*/
const delimiter = /\s*[,\n+]\s*/

export const stringToList = value => (value || '').trim().split(delimiter).filter(Boolean)

export const listToString = value => (value || []).join('\n')
