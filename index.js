ToDoList = React.createClass({
  getInitialState: function(){
    return {
      items: [
        "Book the ticket today",
        "Confirm exercise slot",
        "Drop packet tomorrow",
        "Fruits from the store",
        "Vehicle cleanup in eve"
      ]
    }
  },
  updateItems: function(newItem){
    if (newItem !== ""){
      var allItems = this.state.items.concat([newItem]);
      this.setState({items: allItems});
    }
  },
  handleDelete: function(index){
     existingItems = this.state.items;
     delete existingItems[index];
     this.setState({items: existingItems});
  },
  render: function(){
    return (
      <div id="mainContainer">
        <h1>Sweet ToDo List in React.js</h1>
        <span className="instruction">Click individual todo item to "Inline Edit"</span>
        <ul>
          {
            this.state.items.map(function(item, index){
              return <ToDoListItem item={item} handleDelete={this.handleDelete.bind(null, index)}/>
            }, this)
          }
        </ul>
        <ToDoListForm onFormSubmit={this.updateItems}/>
      </div>
    );
  }
});

var EditableField = React.createClass({
    componentDidMount: function() {
      $(this.refs.editable.getDOMNode()).editable()
    },
    render: function() {
      return (
        <a href="#" ref="editable" id="edit-item" data-type="text" data-title="Edit value">{this.props.item}</a>
      );
    }
});

ToDoListItem = React.createClass({
  getInitialState: function(){
    return{
      item: ''
    }
  },
  render: function(){
    return (
        <div>
          <li>
             <EditableField item={this.props.item}/>
             <a href="#" ref='item' id="delete-item" onClick={this.props.handleDelete}> Delete</a>
          </li>
        </div>
    );
  }
});

ToDoListForm = React.createClass({
  getInitialState: function(){
    return { item: '' };
  },
  onChange: function(e){
      this.setState({
        item: e.target.value
      });
   },
  handleSubmit: function(e){
    e.preventDefault();
    this.props.onFormSubmit(this.state.item);
    this.setState({item: ''});
    React.findDOMNode(this.refs.item).focus();
    return;
  },
  render: function(){
    return (
      <div>
          <span> Add New ToDo Item </span>
          <form onSubmit={this.handleSubmit}>
            <input type='text' ref="item" onChange={this.onChange} value={this.state.item}/>
            <input type='submit' value="Save"/>
          </form>
      </div>
    );
  }
});

React.render(<ToDoList/>, document.body)
