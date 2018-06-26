import React from "react";
import matchSorter from 'match-sorter'
import TitleLine from '../template/title-line';
import ReactTable from "react-table";
import "react-table/react-table.css";
import formData from '../../../data/jcFormsSC.js'

export default class FormsHome extends React.Component {
  constructor() {
    super();
    this.state = {
      data: formData
    };
  }
  render() {
    const { data } = this.state;
    return (
      <div className="Forms-home">
      	<TitleLine title="Forms" />

        <ReactTable
          data={data}          
          filterable
          
          columns={[
            {
              columns: [
                {
                  Header: "Category",
                  accessor: "category",
                  id: "category",
                  Filter: ({ filter, onChange }) =>
                    <select
                      onChange={event => onChange(event.target.value)}
                      style={{ width: "100%" }}
                      value={filter ? filter.value : "all"}
                    >
                      <option value="all">Show All</option>
                      <option value="Small Claims">Small Claims</option>
                      <option value="Eviction">Eviction</option>
                      <option value="Guardianship">Guardianship</option>
                      <option value="Family">Family Law</option>
                      <option value="Domestic Violence">Domestic Violence</option>
                      <option value="Traffic">Traffic</option>
                      <option value="Fee Waiver">Fee Waiver</option>
                    </select>
                },
                {
                  Header: "Form",
                  width: 100,
                  id: "formName",        
                  accessor: d => d.formName,
                  Cell: (d) => {return <a href={d.original.link} target="_blank">{d.original.formName}</a>},

                  filterMethod: (filter, rows) => { return matchSorter(rows, filter.value, { keys: ["formName"] })},
                  filterAll: true
                },
                {
                  Header: "Description",
                  id: "description",
                  accessor: d => d.description,
                  // filterable: false //to disable filter input box
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["description"] }),
                  filterAll: true
                },
                {
                  Header: "Date Revised",
                  id: "dateRevised",
                  accessor: d => d.dateRevised,
                  filterable: false //to disable filter input box 
                }, 
              ]
            },
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
      </div>
    );
  }
}
