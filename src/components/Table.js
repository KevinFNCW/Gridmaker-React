
import { Component } from "react";
import TableRow from "./TableRow";

class Table extends Component {
  constructor() {
    super();
    this.state = {
      numRows: 0,
      numCols: 0,
      selectedColor: "red"
    }
  }

  addRow = () => {
    let addedRows = this.state.numRows + 1;
    let cols = this.state.numCols;

    if(cols === 0){
      this.setState(state => {
          return {
            numRows: addedRows,
            numCols: state.numCols + 1 }
      });
    }
    else{
      this.setState(state => {
          return {numRows: state.numRows + 1}
      });
    }
  }

  addColumn = () => {
    let addedCols = this.state.numCols + 1;
    let rows = this.state.numRows;

    if(rows === 0){
      this.setState(state => {
          return {
            numRows: state.numRows + 1,
            numCols: addedCols }
      });
    }
    else{
      this.setState(state => {
          return {numCols: state.numCols + 1}
      });
    }
  }

  handleColorChange = (event) => {
    this.setState({selectedColor: event.target.value});
  }

  handleApplyColor = (event) => {
    event.target.style.backgroundColor = this.state.selectedColor;
  }

  render() {
    let rows = [];

    for (let i = 0; i < this.state.numRows; i++) {
      rows.push(<TableRow numCols={this.state.numCols} handleApplyColor={this.handleApplyColor} />);
    }

    return (
      <div>
        <button onClick={this.addRow}>Add Row</button>
        <button onClick={this.addColumn}>Add Column</button>
        <button onClick={this.removeRow}>Remove Row</button>
        <button onClick={this.removeColumn}>Remove Column</button>
        <button onClick={this.fillUncolored}>Fill Uncolored Cells</button>
        <button onClick={this.fillAll}>Fill All</button>
        <button onClick={this.clear}>Clear</button>
        <select onChange={this.handleColorChange}>
          <option value="red">red</option>
          <option value="blue">blue</option>
          <option value="yellow">yellow</option>
        </select>
        <table>
          {rows}
        </table>
      </div>
    )
  }
}

export default Table;