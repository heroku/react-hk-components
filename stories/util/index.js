import table from 'markdown-table'

const markdownPropsTable = (component) => {
  const props = component['__docgenInfo']['props']
  const propsToMDArray = Object.keys(props).map(type => {
    return [
      `\`${type}\``,
      `\`${props[type].type.name}\``,
      props[type].defaultValue ? `\`${props[type].defaultValue.value}\`` : `\`${'N/A'}\``,
    ]
  })
  return table([
    ['Prop', 'Type', 'Default'],
    ...propsToMDArray
    ],
    {
      align: ['l', 'l', 'l']
    }
  )
}

export {
  markdownPropsTable
}
