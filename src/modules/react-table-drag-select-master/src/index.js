import React from 'react';
import equal from 'deep-is';
import Model from './Model';
import Cell from './Cell';
import eventToCellLocation from './eventToCellLocation';

export default class extends React.PureComponent {
  static Model = Model;

  constructor(props) {
    super(props);
    this.validateChildren();
    if (this.props.model.getRowCount() === 0) {
      return;
    }
    if (this.props.onModelChange !== undefined &&
      typeof this.props.onModelChange !== 'function')
    {
      throw Error('onModelChange must be a function');
    }
    this.handleTouchEndWindow = this.handleTouchEndWindow.bind(this);
    this.handleTouchStartCell = this.handleTouchStartCell.bind(this);
    this.handleTouchMoveCell = this.handleTouchMoveCell.bind(this);
  }

  componentDidMount() {
    window.addEventListener('mouseup', this.handleTouchEndWindow);
    window.addEventListener('touchend', this.handleTouchEndWindow);
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.handleTouchEndWindow);
    window.removeEventListener('touchend', this.handleTouchEndWindow);
  }

  render() {
    const {model, onModelChange, ...props} = this.props;
    return (
      <div className="table-drag-select">
        <table>
          <tbody>
            {this.modifyChildren()}
          </tbody>
        </table>
      </div>
    );
  }

  // Creates children elements based on the user inputed this.props.children.
  //
  //   - Adds event listeners to children.
  //   - Sets disabled, beingSelected, and selected props on children based on
  //     this.props and this.props.
  modifyChildren() {
    return React.Children.map(this.props.children, (tr, i) => {
      const cells = React.Children.map(tr.props.children, (cell, j) => {
        return (
          <Cell
            onTouchStart={this.handleTouchStartCell}
            onTouchMove={this.handleTouchMoveCell}
            selected={this.props.model.getCellsSelected()[i][j]}
            beingSelected={this.props.model.getCellsBeingSelected()[i][j]}
            beingDeselected={this.props.model.getCellsBeingDeselected()[i][j]}
            key={i.toString() + j.toString()}
            {...cell.props}
          >
            {cell.props.children}
          </Cell>
        );
      });
      return (
        <tr {...tr.props} className={this.props.model.getQuarter(i)}>
          {cells}
        </tr>
      );
    });
  }

  // Throws an error if the structure of this.props.children is wrong
  validateChildren() {
    const {rows, columns} = this.getChildrenDimensions();
    if (React.Children.count(this.props.children) !== rows) {
      throw new TypeError(
        'Mismatch between model row count and children row count'
      );
    }
    for (const tr of this.props.children) {
      if (tr.type !== 'tr') {
        throw new TypeError(
          'A <TableDragSelect> must only contain <tr> children'
        );
      }
      let childColumns = React.Children.count(tr.props.children);
      if (childColumns !== this.props.model.getColumnCount()) {
        throw new TypeError(
          'Mismatch between model column count and children column count'
        );
      }
      for (const td of tr.props.children) {
        if (td.type !== 'td') {
          throw new TypeError('A <tr> must only contain <td> children');
        }
      }
    }
  }

  // Returns the number of rows and columns of this.props.children
  getChildrenDimensions() {
    const rows = React.Children.count(this.props.children);
    if (rows === 0) {
      return {rows: 0, columns: 0};
    }
    const firstRow = this.props.children[0];
    const columns = React.Children.count(firstRow.props.children);
    return {rows, columns};
  }

  handleTouchEndWindow(e) {
    if (e.type === 'mouseup' && e.button !== 0) {
      return;
    }
    const model = this.props.model.clone();
    model.finishSelection();
    if (!this.props.model.equals(model)) {
      this.props.onModelChange(model);
    }
    if(this.props.onSelectionFinished && typeof this.props.onSelectionFinished === 'function') {
      this.props.onSelectionFinished(model.getCellsSelected());
    }
  }

  handleTouchStartCell(e) {
    if (e.type === 'mousedown' && e.button !== 0) {
      return;
    }
    e.preventDefault();
    const {row, column} = eventToCellLocation(e);
    const model = this.props.model.clone();
    model.startSelection(row, column);
    if (!this.props.model.equals(model)) {
      this.props.onModelChange(model);
    }
  }

  handleTouchMoveCell(e) {
    e.preventDefault();
    const {row, column} = eventToCellLocation(e);
    const model = this.props.model.clone();
    model.updateSelection(row, column);
    if (!this.props.model.equals(model)) {
      this.props.onModelChange(model);
    }
  }
}
