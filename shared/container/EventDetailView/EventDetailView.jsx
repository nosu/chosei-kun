import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Helmet from 'react-helmet';

class EventDetailView extends Component {

  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
    this.handleLogoClick = this.handleLogoClick.bind(this);
    this.handleUpdateButtonClick = this.handleUpdateButtonClick.bind(this);
    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
  }

  handleClick() {
    this.setState({
      showAddEvent: true,
    });
  }

  handleLogoClick() {
    this.props.dispatch(Actions.fetchEvents());
  }

  handleUpdateButtonClick() {
  }

  handleAddButtonClick() {
    this.props.dispatch(Actions.showAddForm("ADD_FORM"));
  }

  convertNumberIntoSymbol(number) {
    var symbolMap = ['○', '△', '×'];
    return symbolMap[number];
  }

  render() {
    return (
      <div>
        <Helmet title={this.props.event.title} />

        <Header onClick={function noop() {}} handleLogoClick={this.handleLogoClick}/>
        <div className="container">
          <div className="event-detail">
            <h3 className="event-title">{this.props.event.title}</h3>
            <p className="event-memo">{this.props.event.memo}</p>
            <table className="schedule-table">
              <thead>
                <tr>
                  <th>日程</th>
                  {
                    this.props.event.members.map((member) => {
                      return (
                        <th>
                          <a href="#" onClick={e => this.handleUpdateButtonClick}>{member.name}</a>
                        </th>
                      );
                    })
                  }
                </tr>
              </thead>
              <tbody>
                {
                  this.props.event.dates.map((date, index) => {
                    var rows = [<th>{date}</th>];
                    this.props.event.members.forEach((member) => {
                      rows.push(
                        <td>{this.convertNumberIntoSymbol(member.schedule[index])}</td>
                      );
                    });
                    return <tr>{rows}</tr>;
                  })
                }
              </tbody>
            </table>
            {(() => {
              if(!this.props.form) {
                return (
                  <div className="add-schedule">
                    <input type="button" onClick={this.handleAddButtonClick} className="add-schedule-button" value="出欠を入力する"/>
                  </div>
                );
              }
            })()}
          </div>
            {(() => {
              switch (this.props.form) {
                case "ADD_FORM":
                  return (
                    <div>
                      <form className="form add-form">
                        <input name="name" type="text" placeholder="表示名" />
                        <input name="memo" type="text" placeholder="イベントメモ" />
                        <table>
                          {
                            this.props.event.dates.map((date) => {
                              return (
                                <tr>
                                  <th>{date}</th>
                                  <td>
                                    <div className="button-ok">○</div>
                                    <div className="button-maybe">△</div>
                                    <div className="button-ng">×</div>
                                  </td>
                                </tr>
                              );
                            })
                          }
                        </table>
                        <div className="add-schedule">
                          <input type="button" className="add-schedule-button" value="出欠を登録する" />
                        </div>
                      </form>
                    </div>
                  );

                case "UPDATE_FORM":
                  return (
                    <div></div>
                  );

                default:
                  return (<div>this.props.form: {this.props.form}</div>);
              }
            })()}
          </div>

        <Footer />
      </div>
    );
  }
}

EventDetailView.need = [(params) => {
  return Actions.getEventRequest.bind(null, params.eventId)();
}];

EventDetailView.contextTypes = {
  router: React.PropTypes.object,
};

EventDetailView.propTypes = {
  event: PropTypes.shape({
    eventId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    // memo: PropTypes.string.isRequired,
    dates: PropTypes.array.isRequired,
    members: PropTypes.array.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(store) {
  return {
    event: (store.event),
    form: (store.form),
  };
}

export default connect(mapStateToProps)(EventDetailView);
