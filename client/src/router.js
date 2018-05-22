import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link, browserHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { CLIENT_ROOT_URL } from './actions/index';
import { fetchMenuLinks } from './actions/content';
import { fetchFooter } from './actions/content';
// Import miscellaneous routes and other requirements
import NotFoundPage from './components/pages/not-found-page';
import UnderConstruction from './components/pages/under-construction';
import Navbar from './components/template/navbar';
import Topbar from './components/template/topbar';
import Footer from './components/template/footer';
import Search from './components/template/search';
//import Layout from './components/Layout';
import Languages from './components/template/languages';
// DONT DELETE commented Bot out to hide from all views until bot works for all case types.
// for now bot will only live in small claims
import Bot from './components/chatbot/Bot.jsx';
import MobileBot from './components/mobilebot/MobileBot.jsx';

// Import static pages
import HomePage from './components/pages/home-page';
import TestAccordionBox from './components/template/accordion-box/accordion-box-container';
import ContactPage from './components/pages/contact-page';
import Forms from './components/pages/forms/forms-page';
import FormSearch from './components/pages/forms-page';
import FormsSelectedPage from './components/pages/forms/forms-page-selected';
import FAQs from './components/pages/faqs/faqs-page';
import FaqsSelectedPage from './components/pages/faqs/faqs-page-selected';
import FaqsSelectedSubcategory from './components/pages/faqs/faqs-subcat-selected';
import Videos from './components/pages/videos-page';
import VideoPlayer from './components/pages/video-player';
import Portal from './components/pages/portal-page';
import AzurePortal from './components/pages/azure-portal';
import FindCourthouse from './components/pages/find-courthouse';

import SearchResults from './components/pages/search-results-page'

import SmallClaims from './components/pages/topics/smallclaims/smallclaims';
import SmallClaimsParty from './components/pages/topics/smallclaims/smallclaims-party';
import SmallClaimsStage from './components/pages/topics/smallclaims/smallclaims-stage';
import SmallClaimsSubStage from './components/pages/topics/smallclaims/smallclaims-substage';
import Guardianship from './components/pages/topics/guardianship';
import Eviction from './components/pages/topics/eviction';
import Traffic from './components/pages/topics/traffic';
import Dv from './components/pages/topics/dv';
import FamilyHome from './components/pages/topics/family/family-home';
import Adoption from './components/pages/topics/family/family-adoption';

import TodoApp from './components/pages/todo/components/App';
// import ChecklistApp from './components/pages/checklist/checklistApp';
// import ComponentSamplesPage from './components/pages/component-samples';

// Import authentication related pages
import Login from './components/auth/login';
import Logout from './components/auth/logout';
import Register from './components/auth/register';
import ForgotPassword from './components/auth/forgot-password';
import ResetPassword from './components/auth/reset-password';

// Import profile pages
import EditProfile from './components/auth/edit-profile';
import ViewProfile from './components/profile/view-profile';
import MyCasesDashboard from './components/cases/my-cases-dashboard'; // import Inbox from './components/dashboard/messaging/inbox';
import NewCase from './components/pages/new-case-page';
// import Conversation from './components/dashboard/messaging/conversation';
// import ComposeMessage from './components/dashboard/messaging/compose-message';
// import BillingSettings from './components/billing/settings';

// Import billing pages
// import InitialCheckout from './components/billing/initial-checkout';

// Import admin pages
// import AdminDashboard from './components/admin/dashboard';

// Import higher order components
import RequireAuth from './components/auth/require-auth';

class AppRouter extends Component {
  constructor(props) {
      super(props);
  }

  componentWillMount() {
    this.props.fetchMenuLinks()
    this.props.fetchFooter()
  }

  render() {
    return (
      <BrowserRouter history={browserHistory} >
        <div>
          {/* <ToggleBox />*/}
          <Switch>
            <Route path="/mbot" history={browserHistory} component={MobileBot} />
            <div className="App">
              
              <div className="App-mask" />
              <Navbar menuLinks={this.props.menuLinks} language={this.props.language}/> 
              <Topbar />
              {/*<Search />*/}              
              {/*<Languages />*/}


              {/* DONT DELETE commented Bot out to hide from all views until bot works for all case types.
              for now bot will only live in small claims*/}
              {/*<Bot /> */}
              <div className="Page">
                <Switch>
                  <Route exact path="/" component={HomePage} />
                  <Route path="/home" component={HomePage} />
                    {/*if I want to load app and navs separately in {App} component, and load CaseType modules here--> */}
                    {/*<IndexRoute component={TopicsList} /> */} 
                  <Route path="/test" component={TestAccordionBox} />
                  <Route path="/checklist" component={TodoApp} />
                  <Route path="/contact-us" component={ContactPage} />
                  <Route path="/portal" component={Portal} />
                  <Route path="/azure-portal" component={AzurePortal} />
                  <Route path="/my-case" component={MyCasesDashboard} />
                  <Route path="/register" component={Register} />
                  <Route path="/login" component={Login} />
                  <Route path="/logout" component={Logout} />
                  <Route exact path="/faqs" component={FAQs} />
                  <Route exact path="/faqs/:page" component={FaqsSelectedPage} />
                  <Route path="/faqs/:page/:subcat" component={FaqsSelectedSubcategory} />
                  <Route path="/video-resources" component={Videos} />
                  <Route path="/videos/:videoID" component={VideoPlayer} />
                  <Route path="/forms/search" component={FormSearch} />
                  <Route exact path="/forms" component={Forms} />
                  <Route path="/forms/:page" component={FormsSelectedPage} />


 {/*                 <Route
                    path="/locations"
                    component={() =>
                      (window.location = 'http://www.cc-courts.org/locations/locations.aspx')}
                  />*/}
                  <Route path="/court-locations" component={FindCourthouse} />
                  <Route
                    path="/find-a-case"
                    component={() =>
                      (window.location = 'http://www.cc-courts.org/civil/online-case.aspx')}
                  />
                  <Route path="/forgot-password" component={ForgotPassword} />
                  <Route path="/reset-password/:resetToken" component={ResetPassword} />

                  <Route exact path="/smallclaims" component={SmallClaims} />
                  <Route exact path="/smallclaims/:party" component={SmallClaimsParty} />
                  <Route path="/smallclaims/:party/:stage" component={SmallClaimsStage} />
                  <Route path="/smallclaims/:party/:stage/:subcat" component={SmallClaimsSubStage} />
                  <Route path="/guardianship" component={UnderConstruction} />
                  <Route path="/eviction" component={UnderConstruction} />
                  <Route path="/dv" component={UnderConstruction} />
                  <Route path="/traffic" component={UnderConstruction} />
                  <Route path="/family" component={UnderConstruction} />
                  <Route path="/adoption" component={UnderConstruction} />

                  <Route path="/profile" component={RequireAuth(ViewProfile)} />

                  <Route path="/add-case" component={RequireAuth(NewCase)} />
                  <Route path="/edit-profile" component={RequireAuth(EditProfile)} />

                  <Route path="/search" component={Search} />
                  <Route path="/search-results/:query" component={SearchResults} />


                  <Route component={NotFoundPage} />
                </Switch>
              </div>
            </div>
            <div class="App-footer-push"></div>

          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return { 
    menuLinks: state.content.menuLinks,
    language: state.content.language,
    footer: state.content.footer }
}

export default connect(mapStateToProps, { fetchMenuLinks, fetchFooter })(AppRouter)

/*

<Route exact path="/smallclaims/:party/" component={SmallClaimsParty} >
                    <Route path="smallclaims/:party/:stage" render={(props) => (
                      <SmallClaimsStage {...props} />
                    )}/>

                </Route>
<BrowserRouter>
				<Route path="/" component={App}>
				    <Route path="/contact-us" component={ContactPage} />
				    <Route path="*" component={NotFoundPage} />
				</Route>
			</BrowserRouter>
*/

//	 <Route path="component-samples" component={RequireAuth(ComponentSamplesPage)} />
//	 <Route path="contact-us" component={ContactPage} />

//     <Route path="register" component={Register} />
//     <Route path="login" component={Login} />
//     <Route path="logout" component={Logout} />
//     <Route path="forgot-password" component={ForgotPassword} />
//     <Route path="reset-password/:resetToken" component={ResetPassword} />

//     <Route path="checkout/:plan" component={RequireAuth(InitialCheckout)} />
//     <Route path="billing/settings" component={RequireAuth(BillingSettings)} />
//     <Route path="admin" component={RequireAuth(AdminDashboard)} />

//     <Route path="dashboard">
//       <IndexRoute component={RequireAuth(Dashboard)} />
//       <Route path="inbox" component={RequireAuth(Inbox)} />
//       <Route path="conversation/new" component={RequireAuth(ComposeMessage)} />
//       <Route path="conversation/view/:conversationId" component={RequireAuth(Conversation)} />
//     </Route>

// <Route exact path="profile" />
// 					    <Route component={RequireAuth(Profile)} />

//     <Route path="profile" component={RequireAuth(ViewProfile)} />
