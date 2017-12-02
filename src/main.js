import Preact, {Component} from 'preact'
import PropTypes from 'prop-types'

const store = {
  get: (key) => new Promise((resolve, reject) => {
    chrome.storage.sync.get(key, (obj) => resolve(obj[key]))
  }),
  set: (key, value) => new Promise((resolve, reject) => {
    chrome.storage.sync.set({[key]: value}, () => resolve(value))
  })
}

class Actions extends Component{

  constructor(){
    super()
    this.onClick = this.onClick.bind(this)
    this.state.label = ''
  }

  onClick(ev){
    const company = this.props.company
    if (ev.target.parentNode.classList.contains('x-actions')){
      let label = ev.target.dataset.label

      console.log(label)

      store.get(company)
        .then( oldLabel => label === oldLabel
          ? store.set(company, '')
          : store.set(company, label)
        )
        .then( v => this.setState({label: v}))
    }
  }

  componentDidMount(){
    const company = this.props.company
    chrome.storage.sync.get(company, (obj) => {
      this.setState({label: obj[company]})
    })
  }

  render(){
    const label = this.state.label
    return (
      <span class='x-line'>
        <span class={'x-flag'+' x-'+label}>{label}</span>{' '}
        <span class='x-actions' onClick={this.onClick}>
          <span data-label='good'>好</span>{' '}
          <span data-label='maybe'>也許</span>{' '}
          <span data-label='no'>不要</span>
        </span>
      </span>
    )
  }
}

Actions.propTypes = {
  company: PropTypes.string.isRequired
}



function inject(){
  const items = Array.from(document.querySelectorAll('.job-list-item'))
  for (let item of items){
    if( !item.dataset.injected){
      Preact.render(<Actions company={item.dataset.custName}/>, item.querySelector('.b-tit'))
      item.dataset.injected = true
    }
  }
}

function main(){
  inject()
  const list = document.querySelector('#js-job-content')
  const observer = new MutationObserver(inject)
  observer.observe( list, {childList: true})
}

main()
