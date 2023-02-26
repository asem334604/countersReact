const rootNode = document.getElementById('root');
const root = ReactDOM.createRoot(rootNode);

class Counter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {counter: 0};
        this.minValue = -20;
        this.maxValue = 20;
    }

    incrementCount = () => {
        if (this.state.counter < this.maxValue)
            this.setState((prevState) => ({counter: prevState.counter + 1}));
    };
    decrementCount = () => {
        if (this.state.counter > this.minValue)
            this.setState((prevState) => ({counter: prevState.counter - 1}));
    };

    render() {
        return (
            <div>
                <h1>Counter</h1>
                <button className={'decr_btn'} onClick={this.decrementCount}>-</button>
                &nbsp;
                <span>Count: {this.state.counter}</span>&nbsp;
                <button className={'incr_btn'} onClick={this.incrementCount}>+</button>
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
        this.minValue = -20;
        this.maxValue = 20;
    }

    incrementCount = () => {
        if (this.state.counter < this.maxValue)
            this.setState((prevState) => ({counter: prevState.counter + 1}));
    };
    decrementCount = () => {
        if (this.state.counter > this.minValue)
            this.setState((prevState) => ({counter: prevState.counter - 1}));
    };
    handleInputChange = (e) => {
        this.setState({counterInput: e.target.value});
        if (!this.state.isEdit)
            this.setState({counterInput: ''});
    };
    handleFieldSubmit = (e) => {
        if ((e.key === 'Enter') &&
            !(this.state.counterInput > this.maxValue) &&
            !(this.state.counterInput < this.minValue)) {
            this.setState({counter: +this.state.counterInput});
            this.handleViewSwitch();
        } else if ((e.key === 'Escape') || ((e.key === 'Enter') && !this.state.counterInput))
            this.handleViewSwitch();
        else if (this.state.counterInput > this.maxValue) {
            alert(`maximum value is ${this.maxValue}`);
            e.target.value = '';
        } else if (this.state.counterInput < this.minValue) {
            alert(`minimum value is ${this.minValue}`);
            e.target.value = '';
        }

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
                placeholder={`${this.state.counter}`}
                onKeyDown={this.handleFieldSubmit}
                onChange={this.handleInputChange}
                max={20}
                min={-20}
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