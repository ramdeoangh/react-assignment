import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";

import { mapelServiceAction, mapelProviderAction } from "../../actions";

import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Link,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

import useStyles from "./home.style";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: -1,
      providerArr: [],
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(mapelServiceAction.getService());
    dispatch(mapelProviderAction.getmapelProvider());
  }

  /// filter when we select the services
  handleListItemClick = (event, val) => {
    this.setState({ selectedIndex: val });
    const { dispatch } = this.props;
    dispatch(
      mapelProviderAction.filterProviderDetails(event.currentTarget.innerText)
    );
  };

  // parse the all the services and bind to UI.
  parseServiceDetailsResponse = (list) => {
    let serviceListResult = [];
    const { selectedIndex } = this.state;
    if (list !== null) {
      serviceListResult = list.map((dt, index) => {
        return (
          <ListItem
            button
            selected={selectedIndex === index}
            onClick={(event) => this.handleListItemClick(event, index)}
          >
            <ListItemText primary={dt.attributes.name} />
          </ListItem>
        );
      });
    }
    return serviceListResult;
  };

  // handling the providers response when we select the service or all
  parseProviderDetailsResponse = (providerArr) => {
    let providerListResult = [];

    if (providerArr !== undefined && providerArr !== null) {
      providerListResult = providerArr.map((dt) => {
        return dt.pnm.map((pn, index) => {
          return (
            <ListItem button>
              <ListItemText primary={pn} />
            </ListItem>
          );
        });
      });
    }
    return providerListResult;
  };

  render() {
    const {
      serviceDetails,
      providerDetails,
      filterResponse,
      classes,
    } = this.props;
    const { selectedIndex } = this.state;

    const btnClass = classNames(classes.CardHeader, classes.vcolor);
    return (
      <div className={classes.root}>
        <Container maxWidth="lg">
          <Grid container spacing={10} style={{ marginTop: "20px" }}>
            <Grid item xs={12} sm={6}>
              <Card className={classes.root}>
                <CardHeader
                  title="Control"
                  subheader="Services"
                  className={btnClass}
                ></CardHeader>
                <Divider />
                <CardContent>
                  <List component="nav">
                    {this.parseServiceDetailsResponse(serviceDetails)}
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card className={classes.root}>
                <CardHeader
                  title="Results"
                  subheader="Providers"
                  className={btnClass}
                ></CardHeader>
                <Divider />
                <CardContent>
                  <List component="nav">
                    {selectedIndex !== -1
                      ? this.parseProviderDetailsResponse(filterResponse)
                      : this.parseProviderDetailsResponse(providerDetails)}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}
Home.propTypes = {
  classes: PropTypes.object.isRequired,
  // getAllServices: PropTypes.func.isRequired,
  serviceDetails: PropTypes.object.isRequired,
};

// const mapStateToProps = (state) => {
//   return { serviceDetails: state.mapelServiceReducers.serviceResponse };
// };

const mapStateToProps = (state) => {
  return {
    serviceDetails: state.mapelServiceReducers.serviceResponse,
    providerDetails: state.mapelProviderReducers.providerResponse,
    filterResponse: state.mapelProviderReducers.filterResponse,
  };
};

// const mapDispatchToProps = (dispatch) => ({
//   getAllServices: () => dispatch(maperServiceAction.getService()),
// });

export default withRouter(
  connect(mapStateToProps, null, null, { pure: false })(
    withStyles(useStyles)(Home)
  )
);
