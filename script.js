const rootNode = document.getElementById('root');
const root = ReactDOM.createRoot(rootNode);

class Counter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {counter: 0};
    }

    incrementCount = () => {
        this.setState((obj) => ({counter: obj.counter + 1}));
    };
    decrementCount = () => {
        this.setState((obj) => ({counter: obj.counter - 1}));
    };

    render() {
        return (
            <div>
                <h1>Counter</h1>
                <button onClick={this.decrementCount}>-</button>
                &nbsp;
                <span>Count: {this.state.counter}</span>&nbsp;
                <button onClick={this.incrementCount}>+</button>
            </div>
        );
    }
}


class CounterAdv extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            counter: 0,
            isEdit: false,
            counterInput: ''
        };
    }

    incrementCount = () => {
        this.setState((prevState) => ({counter: prevState.counter + 1}));
    };
    decrementCount = () => {
        this.setState((prevState) => ({counter: prevState.counter - 1}));
    };
    handleInputChange = (e) => {
        const value = e.target.value;
        this.setState({counterInput: e.target.value});
        if (!this.state.isEdit)
            this.setState({counterInput: ''});
    };
    handleFieldSubmit = (e) => {
        if ((e.key === 'Enter') && this.state.counterInput) {
            this.setState({counter: +this.state.counterInput});
            this.handleViewSwitch();
        } else if ((e.key === 'Escape') || ((e.key === 'Enter') && !this.state.counterInput))
            this.handleViewSwitch();
    };
    handleViewSwitch = () => {
        this.setState((prevState) => ({isEdit: !prevState.isEdit}));
    };
    renderNormCounterVal = () => {
        return (
            <div>
                <h1>Advanced counter</h1>
                <div>
                    <button onClick={this.decrementCount}>-</button>
                    &nbsp;
                    <span onClick={this.handleViewSwitch}>Count: {this.state.counter}</span>&nbsp;
                    <button onClick={this.incrementCount}>+</button>
                    <div onClick={this.handleViewSwitch}><small>Click to change value</small></div>
                </div>
            </div>)
    }
    renderInputCount = () => {
        return (<div>
            <h1>Advanced counter</h1>
            <div><small>Current value: {this.state.counter} </small></div>
            <input
                type={'number'}
                name={'counterInput'}
                placeholder={`Enter new value`}
                onKeyDown={this.handleFieldSubmit}
                onChange={this.handleInputChange}
            ></input>
        </div>)
    }

    render() {
        if (!this.state.isEdit)
            return this.renderNormCounterVal();
        else
            return this.renderInputCount();
    }
}

class App extends React.Component {
    render() {
        return (
            <div>
                <Counter/>
                <CounterAdv/>
            </div>
        );
    }
}

root.render(<App/>);