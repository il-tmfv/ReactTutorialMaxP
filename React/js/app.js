var my_news = [
  {
    author: 'Саша Печкин',
    text: 'В четчерг, четвертого числа...',
    bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
  },
  {
    author: 'Просто Вася',
    text: 'Считаю, что $ должен стоить 35 рублей!',
    bigText: 'А евро 42!'
  },
  {
    author: 'Гость',
    text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
    bigText: 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
  }
];

var Article = React.createClass({
  propTypes: {
    data: React.PropTypes.shape({
      author: React.PropTypes.string.isRequired,
      text: React.PropTypes.string.isRequired,
      bigText: React.PropTypes.string.isRequired
    })
  },
  getInitialState: function() {
    return {
      visible: false
    };
  },
  readmoreClick: function(e) {
    e.preventDefault();
    this.setState({visible: true});
  },
  render: function() {
    var author = this.props.data.author,
        text = this.props.data.text,
        bigText = this.props.data.bigText,
        visible = this.state.visible;

    return (
      <div className="article">
        <p className="news__author">{author}:</p>
        <p className="news__text">{text}</p>
        <a onClick={this.readmoreClick} href="#" className={'news__readmore ' + (visible ? 'none': '')}>Подробнее</a>
        <p className={'news__big-text ' + (visible ? '': 'none')}>{bigText}</p>
      </div>
    )
  }
});

var News = React.createClass({
  propTypes: {
    data: React.PropTypes.array.isRequired
  },
  getInitialState: function () {
    return {
      counter: 0
    }
  },
  onTotalNewsClick: function(e) {
    this.setState({counter: ++this.state.counter});
  },
  render: function() {
    var data = this.props.data;
    var newsTemplate 
    if (data.length > 0) {
      newsTemplate = data.map(function(item, index) {
        return (
          <div key={index}>
            <Article data={item} />
          </div>
        )
      })
    }
    else {
      newsTemplate = <p>К сожалению новостей нет</p>
    }

    return (
      <div className="news">
        {newsTemplate}
        <strong onClick={this.onTotalNewsClick} className={'news__count ' + (data.length > 0 ? '':'none') }>Всего новостей: {data.length}</strong>
      </div>
    );
  }
});

var Add = React.createClass({
  getInitialState: function() { //устанавливаем начальное состояние (state)
    return {
      agreeNotChecked: true,
      authorIsEmpty: true,
      textIsEmpty: true
    };
  },
  onFieldChange: function(fieldName, e) {
    if (e.target.value.trim().length > 0) {
      this.setState({[''+fieldName]:false})
    } else {
      this.setState({[''+fieldName]:true})
    }
  },
  componentDidMount: function() {
    ReactDOM.findDOMNode(this.refs.author).focus();
  },
  onBtnClickHandler: function(e) {
    e.preventDefault();
  },
  onCheckRuleClick: function(e) {
    this.setState({agreeNotChecked: !this.state.agreeNotChecked});
  },
  render: function() {
    var agreeNotChecked = this.state.agreeNotChecked,
        authorIsEmpty   = this.state.authorIsEmpty,
        textIsEmpty     = this.state.textIsEmpty;
    return (
      <form className='add cf'>
        <input
          type='text'
          className='add__author'
          defaultValue=''
          placeholder='Ваше имя'
          ref='author'
          onChange={this.onFieldChange.bind(this, 'authorIsEmpty')}
        />
        <textarea
          className='add__text'
          defaultValue=''
          placeholder='Текст новости'
          onChange={this.onFieldChange.bind(this, 'textIsEmpty')}
          ref='text'
        ></textarea>
        <label className='add__checkrule'>
          <input type='checkbox' ref='checkrule' onChange={this.onCheckRuleClick}/>Я согласен с правилами
        </label>

        {/* берем значение для disabled атрибута из state */}
        <button
          className='add__btn'
          onClick={this.onBtnClickHandler}
          ref='alert_button'
          disabled={agreeNotChecked || authorIsEmpty || textIsEmpty}
          >
          Добавить новость
        </button>
      </form>
    );
  }
});

var App = React.createClass({
  getInitialState: function() {
    return {
      news: my_news
    };
  },
  componentDidMount: function() {
    /* Слушай событие "Создана новость"
      если событие произошло, обнови this.state.news
    */
  },
  componentWillUnmount: function() {
    /* Больше не слушай событие "Создана новость" */
  },
  render: function() {
    return (
      <div className="app">
        <Add />
        <h3>Новости</h3>
        <News data={this.state.news}/>
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);