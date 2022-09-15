export function uuidv4 () {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
    (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  )
}

export function getNavstackPath (tree, uid) {
  if (tree.uid === uid) {
    return [{
      name: tree.name,
      to: '/project/' + tree.uid
    }]
  } else if (tree.children) {
    for (let i = 0; i < tree.children.length; i++) {
      const path = getNavstackPath(tree.children[i], uid)
      if (path !== null) {
        path.unshift({
          name: tree.name,
          to: '/project/' + tree.uid
        })
        return path
      }
    }
  }

  return null
}

export function isStringALink (string) {
  return /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/.test(string)
}

export function isStringAnEmail (string) {
  return /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(string)
}

export function isStringAPhoneNumber (string) {
  return /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(string)
}
