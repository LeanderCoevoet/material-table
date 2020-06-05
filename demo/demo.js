import { createMuiTheme } from '@material-ui/core/styles';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MaterialTable from '../src';
import {
  DragDropContext,
} from 'react-beautiful-dnd';

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  
  destClone.splice(droppableDestination.index, 0, removed);
  
  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;
  
  return result;
};

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  
  return result;
};

class App extends Component {
  tableRef = React.createRef();
  
  data = [
    {
      id: 1,
      name: 'A1',
      surname: 'B',
      isMarried: true,
      birthDate: new Date(1987, 1, 1),
      birthCity: 0,
      sex: 'Male',
      type: 'adult',
      insertDateTime: '1994-11-23T08:15:30-05:00',
      time: new Date(1900, 1, 1, 14, 23, 35)
    },
    {
      id: 2,
      name: 'A2',
      surname: 'B',
      isMarried: false,
      birthDate: new Date(1987, 1, 1),
      birthCity: 34,
      sex: 'Female',
      type: 'adult',
      insertDateTime: '1994-11-05T13:15:30Z',
      time: new Date(1900, 1, 1, 14, 23, 35),
      parentId: 1
    },
    {
      id: 3,
      name: 'A3',
      surname: 'B',
      isMarried: true,
      birthDate: new Date(1987, 1, 1),
      birthCity: 34,
      sex: 'Female',
      type: 'child',
      insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
      time: new Date(1900, 1, 1, 14, 23, 35),
      parentId: 1
    },
    {
      id: 4,
      name: 'A4',
      surname: 'Dede Dede Dede Dede Dede Dede Dede Dede',
      isMarried: true,
      birthDate: new Date(1987, 1, 1),
      birthCity: 34,
      sex: 'Female',
      type: 'child',
      insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
      time: new Date(1900, 1, 1, 14, 23, 35),
      parentId: 3
    },
    {
      id: 5,
      name: 'A5',
      surname: 'C',
      isMarried: false,
      birthDate: new Date(1987, 1, 1),
      birthCity: 34,
      sex: 'Female',
      type: 'child',
      insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
      time: new Date(1900, 1, 1, 14, 23, 35)
    },
    // {
    //     id: 6,
    //     name: 'A6',
    //     surname: 'C',
    //     isMarried: true,
    //     birthDate: new Date(1989, 1, 1),
    //     birthCity: 34,
    //     sex: 'Female',
    //     type: 'child',
    //     insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
    //     time: new Date(1900, 1, 1, 14, 23, 35),
    //     parentId: 5
    // },
    // {
    //     id: 11,
    //     name: 'A1',
    //     surname: 'B',
    //     isMarried: true,
    //     birthDate: new Date(1987, 1, 1),
    //     birthCity: 0,
    //     sex: 'Male',
    //     type: 'adult',
    //     insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
    //     time: new Date(1900, 1, 1, 14, 23, 35)
    // },
    // {
    //     id: 21,
    //     name: 'A2',
    //     surname: 'B',
    //     isMarried: false,
    //     birthDate: new Date(1987, 1, 1),
    //     birthCity: 34,
    //     sex: 'Female',
    //     type: 'adult',
    //     insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
    //     time: new Date(1900, 1, 1, 14, 23, 35),
    //     parentId: 1
    // },
    // {
    //     id: 31,
    //     name: 'A3',
    //     surname: 'B',
    //     isMarried: true,
    //     birthDate: new Date(1987, 1, 1),
    //     birthCity: 34,
    //     sex: 'Female',
    //     type: 'child',
    //     insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
    //     time: new Date(1900, 1, 1, 14, 23, 35),
    //     parentId: 1
    // },
    // {
    //     id: 41,
    //     name: 'A4',
    //     surname: 'Dede',
    //     isMarried: true,
    //     birthDate: new Date(1987, 1, 1),
    //     birthCity: 34,
    //     sex: 'Female',
    //     type: 'child',
    //     insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
    //     time: new Date(1900, 1, 1, 14, 23, 35),
    //     parentId: 3
    // },
    // {
    //     id: 51,
    //     name: 'A5',
    //     surname: 'C',
    //     isMarried: false,
    //     birthDate: new Date(1987, 1, 1),
    //     birthCity: 34,
    //     sex: 'Female',
    //     type: 'child',
    //     insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
    //     time: new Date(1900, 1, 1, 14, 23, 35)
    // },
    // {
    //     id: 61,
    //     name: 'A6',
    //     surname: 'C',
    //     isMarried: true,
    //     birthDate: new Date(1989, 1, 1),
    //     birthCity: 34,
    //     sex: 'Female',
    //     type: 'child',
    //     insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
    //     time: new Date(1900, 1, 1, 14, 23, 35),
    //     parentId: 5
    // },
    // {
    //     id: 12,
    //     name: 'A1',
    //     surname: 'B',
    //     isMarried: true,
    //     birthDate: new Date(1987, 1, 1),
    //     birthCity: 0,
    //     sex: 'Male',
    //     type: 'adult',
    //     insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
    //     time: new Date(1900, 1, 1, 14, 23, 35)
    // },
    // {
    //     id: 22,
    //     name: 'A2',
    //     surname: 'B',
    //     isMarried: false,
    //     birthDate: new Date(1987, 1, 1),
    //     birthCity: 34,
    //     sex: 'Female',
    //     type: 'adult',
    //     insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
    //     time: new Date(1900, 1, 1, 14, 23, 35),
    //     parentId: 1
    // },
    // {
    //     id: 32,
    //     name: 'A3',
    //     surname: 'B',
    //     isMarried: true,
    //     birthDate: new Date(1987, 1, 1),
    //     birthCity: 34,
    //     sex: 'Female',
    //     type: 'child',
    //     insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
    //     time: new Date(1900, 1, 1, 14, 23, 35),
    //     parentId: 1
    // },
    // {
    //     id: 42,
    //     name: 'A4',
    //     surname: 'Dede',
    //     isMarried: true,
    //     birthDate: new Date(1987, 1, 1),
    //     birthCity: 34,
    //     sex: 'Female',
    //     type: 'child',
    //     insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
    //     time: new Date(1900, 1, 1, 14, 23, 35),
    //     parentId: 3
    // },
    // {
    //     id: 52,
    //     name: 'A5',
    //     surname: 'C',
    //     isMarried: false,
    //     birthDate: new Date(1987, 1, 1),
    //     birthCity: 34,
    //     sex: 'Female',
    //     type: 'child',
    //     insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
    //     time: new Date(1900, 1, 1, 14, 23, 35)
    // },
    // {
    //     id: 62,
    //     name: 'A6',
    //     surname: 'C',
    //     isMarried: true,
    //     birthDate: new Date(1989, 1, 1),
    //     birthCity: 34,
    //     sex: 'Female',
    //     type: 'child',
    //     insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
    //     time: new Date(1900, 1, 1, 14, 23, 35),
    //     parentId: 5
    // },
    // {
    //     id: 13,
    //     name: 'A1',
    //     surname: 'B',
    //     isMarried: true,
    //     birthDate: new Date(1987, 1, 1),
    //     birthCity: 0,
    //     sex: 'Male',
    //     type: 'adult',
    //     insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
    //     time: new Date(1900, 1, 1, 14, 23, 35)
    // },
    // {
    //     id: 23,
    //     name: 'A2',
    //     surname: 'B',
    //     isMarried: false,
    //     birthDate: new Date(1987, 1, 1),
    //     birthCity: 34,
    //     sex: 'Female',
    //     type: 'adult',
    //     insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
    //     time: new Date(1900, 1, 1, 14, 23, 35),
    //     parentId: 1
    // },
    // {
    //     id: 33,
    //     name: 'A3',
    //     surname: 'B',
    //     isMarried: true,
    //     birthDate: new Date(1987, 1, 1),
    //     birthCity: 34,
    //     sex: 'Female',
    //     type: 'child',
    //     insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
    //     time: new Date(1900, 1, 1, 14, 23, 35),
    //     parentId: 1
    // },
    // {
    //     id: 43,
    //     name: 'A4',
    //     surname: 'Dede',
    //     isMarried: true,
    //     birthDate: new Date(1987, 1, 1),
    //     birthCity: 34,
    //     sex: 'Female',
    //     type: 'child',
    //     insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
    //     time: new Date(1900, 1, 1, 14, 23, 35),
    //     parentId: 3
    // },
    // {
    //     id: 53,
    //     name: 'A5',
    //     surname: 'C',
    //     isMarried: false,
    //     birthDate: new Date(1987, 1, 1),
    //     birthCity: 34,
    //     sex: 'Female',
    //     type: 'child',
    //     insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
    //     time: new Date(1900, 1, 1, 14, 23, 35)
    // },
    // {
    //     id: 63,
    //     name: 'A6',
    //     surname: 'C',
    //     isMarried: true,
    //     birthDate: new Date(1989, 1, 1),
    //     birthCity: 34,
    //     sex: 'Female',
    //     type: 'child',
    //     insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
    //     time: new Date(1900, 1, 1, 14, 23, 35),
    //     parentId: 5
    // },
    // {
    //     id: 14,
    //     name: 'A1',
    //     surname: 'B',
    //     isMarried: true,
    //     birthDate: new Date(1987, 1, 1),
    //     birthCity: 0,
    //     sex: 'Male',
    //     type: 'adult',
    //     insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
    //     time: new Date(1900, 1, 1, 14, 23, 35)
    // },
    // {
    //     id: 24,
    //     name: 'A2',
    //     surname: 'B',
    //     isMarried: false,
    //     birthDate: new Date(1987, 1, 1),
    //     birthCity: 34,
    //     sex: 'Female',
    //     type: 'adult',
    //     insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
    //     time: new Date(1900, 1, 1, 14, 23, 35),
    //     parentId: 1
    // },
    // {
    //     id: 34,
    //     name: 'A3',
    //     surname: 'B',
    //     isMarried: true,
    //     birthDate: new Date(1987, 1, 1),
    //     birthCity: 34,
    //     sex: 'Female',
    //     type: 'child',
    //     insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
    //     time: new Date(1900, 1, 1, 14, 23, 35),
    //     parentId: 1
    // },
    // {
    //     id: 44,
    //     name: 'A4',
    //     surname: 'Dede',
    //     isMarried: true,
    //     birthDate: new Date(1987, 1, 1),
    //     birthCity: 34,
    //     sex: 'Female',
    //     type: 'child',
    //     insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
    //     time: new Date(1900, 1, 1, 14, 23, 35),
    //     parentId: 3
    // },
    // {
    //     id: 54,
    //     name: 'A5',
    //     surname: 'C',
    //     isMarried: false,
    //     birthDate: new Date(1987, 1, 1),
    //     birthCity: 34,
    //     sex: 'Female',
    //     type: 'child',
    //     insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
    //     time: new Date(1900, 1, 1, 14, 23, 35)
    // },
    // {
    //     id: 64,
    //     name: 'A6',
    //     surname: 'C',
    //     isMarried: true,
    //     birthDate: new Date(1989, 1, 1),
    //     birthCity: 34,
    //     sex: 'Female',
    //     type: 'child',
    //     insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
    //     time: new Date(1900, 1, 1, 14, 23, 35),
    //     parentId: 5
    // }
  ];
  
  state = {
    items: this.data,
    selected: [
      {
        id: 6,
        name: 'A6',
        surname: 'C',
        isMarried: true,
        birthDate: new Date(1989, 1, 1),
        birthCity: 34,
        sex: 'Female',
        type: 'child',
        insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
        time: new Date(1900, 1, 1, 14, 23, 35)
      }],
    columns: [
      { title: 'Adı', field: 'name', filterPlaceholder: 'Adı filter', tooltip: 'This is tooltip text' },
      { title: 'Soyadı', field: 'surname', initialEditValue: 'test', tooltip: 'This is tooltip text' },
      { title: 'Evli', field: 'isMarried' },
      { title: 'Cinsiyet', field: 'sex', disableClick: true, editable: 'onAdd' },
      { title: 'Tipi', field: 'type', removable: false, editable: 'never' },
      { title: 'Doğum Yılı', field: 'birthDate', type: 'date' },
      { title: 'Doğum Yeri', field: 'birthCity', lookup: { 34: 'İstanbul', 0: 'Şanlıurfa' } },
      { title: 'Kayıt Tarihi', field: 'insertDateTime', type: 'datetime' },
      { title: 'Zaman', field: 'time', type: 'time' },
      { title: 'Adı', field: 'name', filterPlaceholder: 'Adı filter', tooltip: 'This is tooltip text' },
    ]
  };
  
  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */
  id2List = {
    rows: 'items',
    droppable2: 'selected'
  };
  
  getList = (id) => {
    return this.state[this.id2List[id]];
  };
  
  onDragEnd = (result) => {
    console.log('Custom ', result);
    const { source, destination } = result;
    
    // console.log(this.getList(source.droppableId))
    // dropped outside the list
    if (!destination || source.droppableId === 'headers' ||
      destination.droppableId === 'headers' || source.droppableId === 'groups' || destination === 'groups') {
      return;
    }
    
    if (source.droppableId === destination.droppableId) {
      
      const items = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      );
      
      let state = { items };
      
      if (source.droppableId === 'droppable2') {
        state = { selected: items };
      }
      this.setState(state);
    } else {
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );
      
      this.setState({
        items: result.rows,
        selected: result.droppable2
      });
    }
    console.log(this.state.items);
    console.log(this.state.selected);
  };
  
  render() {
    return (
      <>
        
        {/*<DragDropContext onDragEnd={this.onDragEnd}>*/}
        <MaterialTable
          draggable={{
            // disableDefaultDragDropContext: false,
            // isDraggableHeaderActive: true,
            isDraggableRowActive: true,
            // droppableHeaderId: 'headers',
            // droppableRowId: 'rows',
            // onDragEnd: (result) => this.onDragEnd(result),
          }}
          options={{
            search: false,
            padding: 'dense',
            toolbar: false,
            pageSize: 100,
            pageSizeOptions: [50, 100, 200],
            emptyRowsWhenPaging: false,
          }}
          columns={this.state.columns}
          data={this.state.items}
        />
        
        {/*    <MaterialTable*/}
        {/*        draggable={{*/}
        {/*            disableDefaultDragDropContext: true,*/}
        {/*            isDraggableHeaderActive: true,*/}
        {/*            isDraggableRowActive: true,*/}
        {/*            droppableHeaderId: "header",*/}
        {/*            droppableRowId: "droppable2",*/}
        {/*            onDragEnd: (result) => this.onDragEnd(result),*/}
        {/*        }}*/}
        {/*        options={{*/}
        {/*            search: false,*/}
        {/*            padding: "dense",*/}
        {/*            toolbar: false,*/}
        {/*            pageSize: 100,*/}
        {/*            pageSizeOptions: [50, 100, 200],*/}
        {/*            emptyRowsWhenPaging: false,*/}
        {/*        }}*/}
        {/*        columns={this.state.columns}*/}
        {/*        data={this.state.selected}*/}
        {/*    />*/}
        {/*</DragDropContext>*/}
      
      </>
    )
      ;
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);

module.hot.accept();
