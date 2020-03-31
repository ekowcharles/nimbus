import React, { Component } from 'react';

import { Route, Switch, withRouter } from 'react-router-dom';

import NotFound from './components/not_found';

import TermsOfService from './components/terms/terms_of_service'
import PrivacyPolicy from './components/terms/privacy_policy'
import Header from './components/header';
import Aws from './components/aws/index';
import Footer from './components/footer';

import CookieMessage from './components/cookies';
import { withCookies } from 'react-cookie';
import { parseState, setAttributes, backfill } from "./components/utils/awstfstate";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      detailsLoading: false,
      minimumPasswordLength: 7,
      resource: {},
      resourceAttributes: undefined,
      allAttributes: undefined,
      error: undefined,
      detailsError: undefined,
      numbusInput: undefined,
      inputCollapsed: false,
      attributesCollapsed: false,
      viewType: "tfstate",
      accountId: undefined,
      region: undefined,
      acceptCookie: this.getCookie('acc'),
      options: {
        vpc: {
          hideId: false,
          hideCidr: false,
          hideStatus: false,
          hideIcon: false
        },
        subnet: {
          hideId: false,
          hideCidr: false,
          hideStatus: false
        },
        az: {
          hideName: false
        },
        instance: {
          hide: false,
          hideType: false,
          hideStatus: false
        },
        database: {
          hide: false,
          hideName: false,
          hideStatus: false
        },
        bucket: {
          hide: false,
          hideName: false,
        }
      }
    };
  }

  changeRegionSelection = (e, accountId, region) => {
    e.stopPropagation()

    this.setState({
      accountId: accountId,
      region: region
    })
  }

  updateOption = (resource, option, value) => {
    var opts = this.state.options;
    opts[resource][option] = !value
    this.setState({ options: opts })
  }

  updateTfstateOrSchema = (numbusInput) => {
    this.setState({
      numbusInput: numbusInput,
      resourceAttributes: undefined
    })
  }

  loadPage = page => {
    this.props.history.push(page);
  };

  updateViewType = viewType => {
    this.setState({
      viewType: viewType,
      numbusInput: undefined,
      allAttributes: {},
      resourceAttributes: undefined,
      accountId: undefined,
      region: undefined,
      resource: {}
    })
  }

  updateResourceAttributes = (key) => {
    this.setState({
      resourceAttributes: this.state.allAttributes[key]
    })
  }

  toggleInputCollapsedClass = () => {
    this.setState({ inputCollapsed: !this.state.inputCollapsed })
  }

  toggleAttributesCollapsedClass = () => {
    this.setState({ attributesCollapsed: !this.state.attributesCollapsed })
  }

  getCookie = name => {
    return this.props.cookies.get(name, { path: '/' });
  };

  setCookie = (name, value) => {
    if (this.state.acceptCookie === true || name === 'acc') {
      this.props.cookies.set(name, value, { path: '/' });
    }
  };

  clearCookies = () => {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var name = cookies[i].split('=')[0];
      if (name.trim() !== '') {
        this.props.cookies.remove(name);
      }
    }
  };

  acceptCookie = e => {
    this.setCookie('acc', true);
    this.setState({ acceptCookie: true });
  };

  rejectCookie = e => {
    this.clearCookies();

    this.setCookie('acc', true);
    this.setState({ acceptCookie: false });
  };

  // AWS
  setResource = input => {
    let resource = {}
    let allAttributes = {}

    if (this.state.viewType === "tfstate") {
      resource = parseState(function (key, value) { allAttributes[key] = value }, JSON.parse(input))
      resource = backfill(resource)
    } else {
      resource = JSON.parse(input)
      resource = backfill(resource)

      setAttributes(function (key, value) { allAttributes[key] = value }, resource)
    }

    this.setState({
      resource: resource || {},
      allAttributes: allAttributes || {},
      resourceAttributes: {},
      accountId: undefined,
      region: undefined
    })
  }
  // AWS end

  render() {
    const menuOptions = this.state.options
    let cookieComponent = null

    if (this.state.acceptCookie === undefined) {
      cookieComponent = (
        <CookieMessage
          acceptCookie={this.acceptCookie}
          rejectCookie={this.rejectCookie}
        />
      );
    }

    return (
      <React.Fragment>
        <div className="main-layout aws">
          <Header />
          <Switch>
            <Route
              path="/"
              exact
              strict
              render={pps => (
                <Aws
                  match={pps}
                  accountId={this.state.accountId}
                  region={this.state.region}
                  setResource={this.setResource}
                  viewType={this.state.viewType}
                  updateTfstateOrSchema={this.updateTfstateOrSchema}
                  updateViewType={this.updateViewType}
                  menuOptions={menuOptions}
                  updateOption={this.updateOption}
                  loading={this.state.loading}
                  error={this.state.error}
                  detailsError={this.state.detailsError}
                  detailsLoading={this.state.detailsLoading}
                  updateResourceAttributes={this.updateResourceAttributes}
                  changeRegionSelection={this.changeRegionSelection}
                  resourceAttributes={this.state.resourceAttributes}
                  resource={this.state.resource}
                  inputCollapsed={this.state.inputCollapsed}
                  toggleInputCollapsedClass={this.toggleInputCollapsedClass}
                  attributesCollapsed={this.state.attributesCollapsed}
                  toggleAttributesCollapsedClass={this.toggleAttributesCollapsedClass}
                />
              )}
            />
            <Route
              path="/terms-of-service"
              render={pps => (
                <TermsOfService
                  match={pps}
                  back={() => this.loadPage("/")}
                  loadPage={this.loadPage}
                />
              )}
            />

            <Route
              path="/privacy-policy"
              render={pps => (
                <PrivacyPolicy
                  match={pps}
                  back={() => this.loadPage("/")}
                  loadPage={this.loadPage}
                />
              )}
            />

            <Route render={() => <NotFound />} />
          </Switch>
        </div>
        <Footer loadPage={this.loadPage} />
        {cookieComponent}
      </React.Fragment >
    );
  }
}

export default withCookies(withRouter(App));

export { App };
