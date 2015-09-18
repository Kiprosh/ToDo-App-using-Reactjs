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
  handleEdit: function(){
    alert("rohan");
  },
  render: function(){    
    return (
      <div id="mainContainer">
        <h1>Sweet ToDo List in React.js</h1>
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

ToDoListItem = React.createClass({
  getInitialState: function(){
    return{
      item: ''
    }
  },
  handleChange: function(event){    
    this.setState({text: event.target.value});
  },
  render: function(){
    return (
        <div>
          <li>
            {this.props.item}
             <a href="#" ref='item' onClick={this.props.handleDelete}> Delete</a>            
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
