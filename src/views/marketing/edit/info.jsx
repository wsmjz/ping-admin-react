class TemperatureInput extends React.Component {

    handleChange = (e) => {
        this.props.onTemperatureChange(e.target.value);
    };

    render() {
        return (
            <fieldset>
                <legend>输入{scaleNames[this.props.scale]}:</legend>
                <input type="number" value={this.props.temperature} onChange={this.handleChange}/>
            </fieldset>
        )
    }
}