/**
 *  Home Page Taskbar Slider (in React)
 *
 * @date 8/7/2017
 * @author Shaun Lewin
 */

$('#taskbar').on('click', '.sidebar-toggle-right', function(e){
    $(e.delegateTarget).toggleClass('open');
});

var TaskBarContainer = React.createClass({

    getInitialState: function() {
        return {
            tasks: [],
            transactions: [],
            user_id: null
        };
    },

    getData: function() {
        return $.ajax({
           url: '/tasks/get-tasks',
           method: 'POST',
           data: {format: 'json'}
        });
    },

    componentWillMount: function() {
        var tasks = this.getData(), _this = this;

        tasks.done(function(tasks){
            _this.setState({
                tasks: tasks,
                //transactions: res.aFolder,
                //user_id: res.user_id
            });
        });
    },

    renderTaskBar: function() {
        return (
            <div className="sidebar-inner">
                <div className="sidebar-heading">Upcoming Tasks
                    <a href="/tasks" className="link-green text-right pull-right">View All ({this.state.tasks.length})</a>
                </div>
                <TaskBar
                    //realtorId={this.state.user_id}
                    tasks={this.state.tasks}
                    //transactions={this.state.transactions}
                />
            </div>
        );
    },

    render: function() {        
        return this.renderTaskBar();        
    }
});

var TaskBar = React.createClass({
    
    getInitialState: function() {
        var date = new Date(), month = date.getMonth() + 1
        
        return {
            createNewTask: false,
            newTask: {
                minDate: date.getFullYear() + '-' + ((month < 10) ? '0'+ month : month) + '-' + date.getDate()
             }
        }
    },
    
    handleInputChange(e){
        var name = e.target.name;        
        
        this.setState({
            name: e.target.value            
        });
    },    
    
    toggleForm(e){
        e.preventDefault();
        this.setState({
           createNewTask: !this.state.createNewTask 
        }) 
    },
    
    saveTask(e){
        e.preventDefault();
        $.ajax({
            url: '/task/edittasks',
            method: 'POST'
        });
    },

    render: function() {
        return (
            <div>                
                {/* <a className="btn btn-primary btn-block new-task" href="#">Create a New Task</a> */}
                <div className="task-list">
                {
                    this.props.tasks.map((task, i) => (
                        <Task key={i} data={task} />
                    ))
                }
                </div>
            </div>
        )
    }

});

var Task = React.createClass({

    getPriority: function() {
        var _task = this.props.data,
            _now = new Date(),
            _dueDate = new Date(_task.DUE_DATE),
            _taskColor = '';

        var diff = Math.ceil( (_dueDate - _now ) / (1000 * 3600 * 24));

        if(diff === 1) {
            _taskColor = 'task-orange';
        }
        else if(diff === 0 || diff < 0) {
            _taskColor = 'task-magenta';
        }
        else {
            _taskColor = 'task-green';
        }

        return _taskColor;
    },

    render() {
        var _task = this.props.data;
        return(
            <div className={'task-item ' + this.getPriority()}>
                <span className="task-title">{_task.TASK_DESC}</span>
                <span className="trans-title">{_task.FOLDER_NAME}</span>
                <span className="due-date due-today">Due: {_task.DUE_DATE_FOR_DISPLAY}</span>
            </div>
        );
    }

});

const Select = React.createClass({
    render: function() {
        var _options = this.props.options;
        return(
            <select name={this.props.name} onChange={this.props.onChange}>
            <option></option>
            {
                Object.keys(_options).map((key, i) => {
                    return (<option key={i} value={key}>{_options[key]}</option>);
                })
            }
            </select>
        )
    }
});

ReactDOM.render(<TaskBarContainer />, document.getElementById('taskbar-react'));