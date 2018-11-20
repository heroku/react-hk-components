import { themes } from '@storybook/components'

export default {
  ...themes.normal,
  mainBackground: '#eef1f6 linear-gradient(to bottom right, #eef1f6,#FFFFFF)',
  mainBorderColor: '#f7f8fb',
  mainTextFace: 'Salesforce Sans',
  brand: {
    padding: '0px',
    a: {
      border: 0,
      color: '#79589f',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'start',
      textAlign: 'left',
      letterSpacing: '.1em',
      fontWeight: 700,
      fontSize: '13px',
      '&:before': {
        content: '""',
        backgroundImage: 'url(/logo.svg)',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        width: '24px',
        height: '27px',
        marginRight: '8px',
        display: 'inline-block'
      }
    },
    button: {
      border: 0,
      color: '#79589f'
    }
  }
}
