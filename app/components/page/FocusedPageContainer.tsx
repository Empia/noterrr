import * as React from "react";
import { connect } from 'react-redux';
let PageContentForm = require('./PageContentForm.jsx');

import * as actions from '../../stores/page/PageActions';
import {store} from '../../main';
import { Router, Route, Link, browserHistory, withRouter } from "react-router";
var Select = require('react-select');
import 'react-select/dist/react-select.css';

const mapStateToProps = ({addingPageContent, pageContents, pages, selectedPage}) => ({
  addingPageContent,
  pageContents,
  pages,
  selectedPage
});

const mapDispatchToProps = dispatch => ({
    toggleAddPageContent: () => dispatch(actions.toggleAddPageContent()),
    selectPage: (pageId) => dispatch(actions.selectPage(pageId)),
    removePageContent: (pageId, pageContentId) => dispatch(actions.removePageContent(pageId, pageContentId)),
   // updatePage: (pageId) => dispatch(actions.removePage(pageId)),
    addPageContent: (pageId,content) => dispatch(actions.addPageContent(pageId, content)),
});

interface FocusedPageContainerProps extends React.Props<any>{
  pageId:string;
  currentPage?:any;
  params: any;
  removePageContent: any;
  addingPageContent: any;
  pageContents: any;
  selectPage: any;
  selectedPage: any;
  pages: any;
  toggleAddPageContent: any;
  addPageContent: any;
}

interface GeneralState {
  pages: any;
}

interface FocusedPageContainerState{ 
}
function RemoveButton(props) {
  return <button onClick={() => props.toRemove(props.pageId, props.contentId)}>Remove</button>
}

class FocusedPageContainer extends React.Component<FocusedPageContainerProps, FocusedPageContainerState>{
  constructor(){
    super();
    //this.page = this.props.pages;
    //this.pageId = this.props.params.pageId
  }
  
  componentWillMount() {
    store.dispatch(actions.fetchPageContent(this.props.params.pageId)).then(() =>
      console.log(store.getState())
    )    
    store.subscribe( () => {
      let state = store.getState() as GeneralState
      let pages_state = state.pages
      if (pages_state.selectedPage == undefined && pages_state.isFetched) {
        store.dispatch(actions.selectPage(this.props.params.pageId))
        console.log('getState ',store.getState() )
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.pageId !== this.props.params.pageId) {
      console.log('PageContentForm pages', this.props.pages);
      store.dispatch(actions.fetchPageContent(nextProps.params.pageId)).then(() =>
        console.log(store.getState())
      )    
      store.dispatch(actions.selectPage(nextProps.params.pageId))
    }
  }
  componentDidUpdate() {
/*
    console.log('componentDidUpdate', this);
    var el =ReactDOM.findDOMNode(this.refs.add) as HTMLElement
    if (el) el.focus();
*/
  }




  createPageContent = (values) => {
    console.log('values',values);
    /*
    if (evt.which !== 13) return;
    console.log('ref', this.refs);
    var title = (ReactDOM.findDOMNode(this.refs.add) as HTMLInputElement).value;
    this.props.addPage({title});
    this.props.toggleAddPage();
    */
    this.props.addPageContent(this.props.params.pageId,values);
    this.props.toggleAddPageContent();
  }
  updatePage = (evt) => {
    return (id) => { 
      console.log('ref', this.refs, evt.currentTarget);
    //  this.props.addPage(title );
    //  this.props.toggleAddPage();
      return false;
    }
  }
  removePageSender = ((pageId, pageContentId) => this.props.removePageContent(pageId, pageContentId))


  options = (pages) => {
    if (pages !== undefined && pages.length > 0) {
      return pages.map((page) => {
        return {value: page._id, label: page.title}
      });
    } else {
      return [];
    }
   }

  logChange(val) {
      console.log("Selected: ", val);
  }

  render(){
    let initialValues = {
        inPageId: this.props.params.pageId
    };
    return  (
      <div className="pageContent">
        <h3 className="pageContent__pageHeader">Page {this.props.pages.selectedPage ? this.props.pages.selectedPage.title : '' } 
        </h3>

        <Select
            name="form-field-name"
            value="two"
            options={this.options(this.props.pages.items)}
            onChange={this.logChange}
        />

        <button onClick={ e => this.props.toggleAddPageContent() }>Add page</button>
        <div className="pageContent__contentCreateToggle">
           { this.props.addingPageContent && <PageContentForm.default 
                                          pageId={this.props.params.pageId} 
                                          initialValues={initialValues} 
                                          onSubmit={this.createPageContent}/>}
        </div>        
        <div className="pageContent__contentList">
          <ul>
            {this.props.pageContents.page_content.map((p, idx) => 
              <div className="page" key={p._id}>
              <li>{p.title}</li>
                <div className="pageContent__contentResource-content_type">content_type: { p.content_type}</div>
                <div className="pageContent__contentResource-content_value">content_value: { p.content_value}</div>
                <div className="pageContent__contentResource-inPageId">inPageId: { p.inPageId}</div>
                <div className="pageContent__contentResource-inContent">inContent: { p.inContent}</div>
                <div className="pageContent__contentResource-labels">labels: { p.labels}</div>              
              <input ref={"update-"+p._id} onKeyPress={this.updatePage(idx)}/>
              <RemoveButton pageId={p.pageId} contentId={p._id} toRemove={ this.removePageSender }/></div>)}

          </ul>
         </div>
      </div>
      );
  }  
}
 
export default connect(mapStateToProps, mapDispatchToProps)(FocusedPageContainer);