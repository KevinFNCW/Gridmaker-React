
import { Component } from "react";
import TableRow from "./TableRow";

class Table extends Component {
  constructor() {
    super();
    this.state = {
      numRows: 0,
      numCols: 0,
      selectedColor: "red",
      bgColor: "",
      bgColorRow: 0,
      bgColorCol: 0,
    };
  }

  addRow = () => {
    let addedRows = this.state.numRows + 1;
    let cols = this.state.numCols;

    if(cols === 0){
      this.setState(state => {
          return {
            numRows: addedRows,
            numCols: state.numCols + 1,
            bgColorRow: state.numRows,
            bgColorCol: state.numCols + 1,
          }
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
            numCols: addedCols,
            bgColorRow: state.numRows + 1,
            bgColorCol: state.numCols,
          }
      });
    }
    else{
      this.setState(state => {
          return {numCols: state.numCols + 1}
      });
    }
  }

  removeRow = () => {
    // if the current number of rows is zero, do nothing
    if (this.state.numRows === 0) {
      return;
    }

    // decrease the number of rows by 1
    this.setState({
      numRows: this.state.numRows - 1,
      bgColorRow: this.state.numRows - 1,
    })
  }

  removeColumn = () => {
    // if the current number of columns is zero, do nothing
    if (this.state.numCols === 0) {
      return;
    }

    // decrease the number of columns by 1
    this.setState({
      numCols: this.state.numCols - 1,
      bgColorCol: this.state.numCols - 1,
    })
  }

  fillAll = () => {
    //saves current color, row and column value to apply background color
    //ensures new rows and columns won't get background color
    this.setState({
      bgColor: this.state.selectedColor,
      bgColorRow: this.state.numRows,
      bgColorCol: this.state.numCols,
    });
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
      if (i < this.state.bgColorRow) {  //used by fillAll function to only apply background color to current cells
        rows.push(<TableRow bgColor={this.state.bgColor} bgColorCol={this.state.bgColorCol} numCols={this.state.numCols} handleApplyColor={this.handleApplyColor} />);
      }
      else {
        rows.push(<TableRow numCols={this.state.numCols} handleApplyColor={this.handleApplyColor} />);
      }
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