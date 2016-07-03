var App = React.createClass({
  render: function() {
    return (
      <div className="app">
        Всем привет, я компонент App!
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);