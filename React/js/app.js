var my_news = [
  {
    author: 'Саша Печкин',
    text: 'В четверг, четвертого числа...'
  },
  {
    author: 'Просто Вася',
    text: 'Считаю, что $ должен стоить 35 рублей!'
  },
  {
    author: 'Гость',
    text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000'
  }
];

var Article = React.createClass({
  render: function() {
    var author = this.props.data.author,
        text = this.props.data.text;

    return (
      <div className="article">
        <p className="news__author">{author}:</p>
        <p className="news__text">{text}</p>
      </div>
    )
  }
});

var News = React.createClass({
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
        <strong className={data.length > 0 ? '':'none'}>Всего новостей: {data.length}</strong>
      </div>
    );
  }
});

var App = React.createClass({
  render: function() {
    return (
      <div className="app">
        Всем привет, я компонент App! Я умею отображать новости.
        <News data={my_news}/>
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);