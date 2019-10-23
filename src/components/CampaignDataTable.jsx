import React, {forwardRef, Component} from 'react';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import CheckCircle from '@material-ui/icons/CheckCircle';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Moment from 'moment';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref}/>),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
};

export default class CampaignDataTable extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      columns: [
        {title: 'Name', field: 'name', filtering: false},
        {title: 'Start Date', field: 'startDate'},
        {
          title: 'End Date',
          field: 'endDate',
        },
        {
          title: 'Active',
          field: 'active',
          filtering: false,
          render: (rowData) => {
            return this.active(rowData);
          },
        },
        {title: 'Budget USD', field: 'Budget', filtering: false},
      ],
      data: [],
      activeColor: 'red',
    };
  }

  componentDidMount() {
    // Expose campaignDataTable components addCampaign method globally
    // set data to the campaigns table
    window.AddCampaigns = (data) => {
      const newData = this.addCampaigns(data);
      this.setState({
        data: newData,
      });
    };
  }

  active(campaign) {
    const today = Moment(new Date());
    let activeColor = this.state.activeColor;
    let isActive = 'Inactive';
    if (today.isBetween(new Date(campaign.startDate), new Date(campaign.endDate))) {
      activeColor = 'green';
      isActive = 'Active';
    }

    return (
      <div><CheckCircle style={{color: activeColor}}/> {isActive} </div>
    )
  }

  /**
   * Adds campaigns to the tables data
   *
   * @param data
   * @returns {any[] | string}
   */
  addCampaigns(data) {
    const currentData = this.state.data;

    // remove invalid dates
    const validatedDates = data.filter((campaign) => {
      return Moment(new Date(campaign.startDate)).isBefore(new Date(campaign.endDate));
    });

    return currentData.concat(validatedDates);
  };

  render() {
    return (
      <div>
        <MaterialTable
          icons={tableIcons}
          title="Editable Example"
          options={{
            filtering: true
          }}
          columns={this.state.columns}
          data={this.state.data}
          editable={{
            onRowAdd: newData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = [...this.state.data];
                  data.push(newData);
                  this.setState({...this.state, data});
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = [...this.state.data];
                  data[data.indexOf(oldData)] = newData;
                  this.setState({...this.state, data});
                }, 600);
              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = [...this.state.data];
                  data.splice(data.indexOf(oldData), 1);
                  this.setState({...this.state, data});
                }, 600);
              }),
          }}
        />
      </div>
    );
  };
}
