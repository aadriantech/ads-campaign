import React, {Component} from 'react';
import MaterialTable from 'material-table';
import TableIconsHelper from '../helpers/TableIconsHelper'
import CheckCircle from '@material-ui/icons/CheckCircle';
import Moment from 'moment';
import NumberAbbreviate from 'number-abbreviate';

// load the table icons
const tableIcons = TableIconsHelper;

export default class CampaignDataTable extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      columns: [
        {title: 'Name', field: 'name', filtering: false},
        {
          title: 'Start Date',
          field: 'startDate',
          customFilterAndSearch: (dateSearchKey, rowData) => {
            return this.filterStartDate(dateSearchKey, rowData);
          }
        },
        {
          title: 'End Date',
          field: 'endDate',
          customFilterAndSearch: (dateSearchKey, rowData) => {
            return this.filterEndDate(dateSearchKey, rowData);
          }
        },
        {
          title: 'Active',
          field: 'active',
          filtering: false,
          render: (rowData) => {
            return this.active(rowData);
          },
        },
        {
          title: 'Budget USD',
          field: 'Budget',
          filtering: false,
          render: (rowData) => {
            return this.abbreviateMoney(rowData);
          },
        },
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

  /**
   * Abbreviates money values into human readable string formats
   *
   * @param campaign
   * @returns {*}
   */
  abbreviateMoney(campaign) {
    if (campaign.Budget) {
      const numberAbbreviation = new NumberAbbreviate();
      const formattedMoney = numberAbbreviation.abbreviate(campaign.Budget, 2);

      return (
        <div>{formattedMoney} USD</div>
      )
    } else {
      throw new Error('Something is wrong with the campaign budget key or value, check for spaces in words.');
    }
  }

  /**
   * Sets the active column data and style
   *
   * @param campaign rowdata material table object
   * @returns {*}
   */
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
      return Moment(new Date(campaign.startDate))
        .isBefore(new Date(campaign.endDate));
    });

    return currentData.concat(validatedDates);
  };

  /**
   * Used in search form filters the start Date
   * show dates after start date
   *
   * @param dateSearchKey
   * @param rowData
   * @returns {boolean}
   */
  filterStartDate(dateSearchKey, rowData){
    return Moment(new Date(rowData.startDate))
      .isSameOrAfter(new Date(dateSearchKey))
  }

  /**
   * Used in search form filters the end Date
   * show dates before end date
   *
   * @param dateSearchKey
   * @param rowData
   * @returns {boolean}
   */
  filterEndDate(dateSearchKey, rowData){
    return Moment(new Date(rowData.startDate))
      .isSameOrBefore(new Date(dateSearchKey))
  }

  render() {
    return (
      <div>
        <MaterialTable
          icons={tableIcons}
          title="Campaigns"
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
