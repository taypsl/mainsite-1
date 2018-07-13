import axios from 'axios';
import { FETCH_CATEGORIES } from './types'
import { FETCH_PAGE } from './types'
import { FETCH_PARTIES } from './types'
import { FETCH_FORM_LAYOUT } from './types'
import { FETCH_FOOTER_LAYOUT } from './types'
import { FETCH_MENU_LINKS } from './types'
import { FETCH_FORMS } from './types'
import { FETCH_FAQS } from './types'
import { FETCH_FAQ_LAYOUT } from './types'
import { FETCH_FAQ_SUBCATEGORIES } from './types'
import { FETCH_CONTENT } from './types'
import { FETCH_SUBCONTENT } from './types'
import { SAVE_ID } from './types'
import { FETCH_CONTACT_LAYOUT } from './types'
import { FETCH_RESOURCE_LINKS } from './types'
import { FETCH_STAGES } from './types'
import { FETCH_VIDEOS } from './types'
import { FETCH_VIDEO_LINKS } from './types'
import { FETCH_VIDEO_CATEGORIES } from './types'
import { FETCH_ASSET } from './types'
import { STORE_STAGE_ID } from './types'
import { FETCH_CHECKLIST } from './types'

// protected environment variables
const API_BASE_URL = process.env.API_BASE_URL;
const API_SPACE_ID = process.env.API_SPACE_ID;
const API_TOKEN = process.env.API_TOKEN;
const SMALL_CLAIMS_ID = process.env.SMALL_CLAIMS_ID;

const TEST_SPACE_ID = process.env.TEST_SPACE_ID;
const TEST_CONTENT_PREVIEW_TOKEN = process.env.TEST_CONTENT_PREVIEW_TOKEN;

// =========================================================
// Functions to load different content types from contentful
// =========================================================
export function fetchContact() {
  return function(dispatch){
    axios.get(`${API_BASE_URL}/spaces/${TEST_SPACE_ID}/entries?access_token=${TEST_CONTENT_PREVIEW_TOKEN}&content_type=contact&locale=*`)
    .then( (response) => { 
      dispatch({type: FETCH_PAGE, payload: response});
      })
    .catch((error) => console.log('err: ', error));
  }
}

export function fetchCategories() {
  return function(dispatch){
    axios.get(`${API_BASE_URL}/spaces/${TEST_SPACE_ID}/entries?access_token=${TEST_CONTENT_PREVIEW_TOKEN}&content_type=category&locale=*`)
    .then( (response) => { 
      const categories = response.data.items.map((category) => ({
        categoryId: category.sys.id,
        slug: category.fields.slug['en-US'],
        id: category.fields.id['en-US'],
        titles: category.fields.title,
        imageId: category.fields.image['en-US'].sys.id
      }))
    .sort((a, b) => a.id - b.id);
      dispatch({type: FETCH_CATEGORIES, payload: categories});

      })
    .catch((error) => console.log("err: ", error));
  }
}

export function fetchParties(id) {
  return function(dispatch){
    axios.get(`${API_BASE_URL}/spaces/${TEST_SPACE_ID}/entries?access_token=${TEST_CONTENT_PREVIEW_TOKEN}&content_type=party&fields.categories.sys.id=${id}&locale=*`)
    .then( (response) => { 
      console.log('~~fetchParties~~')
      //return an ordered parties object
      const parties = response.data.items.map((party) => ({
        partyId: party.sys.id, 
        id: party.fields.id['en-US'],
        url: party.fields.slug['en-US'],
        titles: party.fields.title,
        imageId: party.fields.image['en-US'].sys.id,
        category: party.fields.categories['en-US']
      }))
      .sort((a, b) => a.id - b.id);
      dispatch({type: FETCH_PARTIES, payload: parties});
      })
    .catch((error) => console.log("err: ", error));
  }
}

export function fetchFormLayout() {
  return function(dispatch){
    axios.get(`${API_BASE_URL}/spaces/${TEST_SPACE_ID}/entries?access_token=${TEST_CONTENT_PREVIEW_TOKEN}&content_type=formLayout&locale=*`)
    .then( (response) => { 
      dispatch({type: FETCH_FORM_LAYOUT, payload: response});
    })
    .catch((error) => console.log('err: ', error));
  }
}

export function fetchForms(label) {
  return function(dispatch){
    axios.get(`${API_BASE_URL}/spaces/${TEST_SPACE_ID}/entries?access_token=${TEST_CONTENT_PREVIEW_TOKEN}&content_type=formList&fields.categoryLabel=${label}&locale=*`)
    .then( (response) => { 
      dispatch({type: FETCH_FORMS, payload: response});
      })
    .catch((error) => console.log('err: ', error));
  }
}

export function fetchFaqLayout() {
  return function(dispatch){
    axios.get(`${API_BASE_URL}/spaces/${TEST_SPACE_ID}/entries?access_token=${TEST_CONTENT_PREVIEW_TOKEN}&content_type=faqLayout&locale=*`)
    .then( (response) => { 
      dispatch({type: FETCH_FAQ_LAYOUT, payload: response});
      })
    .catch((error) => console.log('err: ', error));
  }
}

export function fetchFaqs(label, subcat) {
  if (subcat == "general") {
    return function(dispatch){
      axios.get(`${API_BASE_URL}/spaces/${TEST_SPACE_ID}/entries?access_token=${TEST_CONTENT_PREVIEW_TOKEN}&content_type=faq&fields.category.sys.id=${label}&locale=*`)
      .then( (response) => { 
        dispatch({type: FETCH_FAQS, payload: response});
        })
      .catch((error) => console.log('err: ', error));
    }
  } else {
    return function(dispatch){
      axios.get(`${API_BASE_URL}/spaces/${TEST_SPACE_ID}/entries?access_token=${TEST_CONTENT_PREVIEW_TOKEN}&content_type=faq&fields.category.sys.id=${label}&fields.subcategories.sys.id=${subcat}&locale=*`)
      .then( (response) => { 
        dispatch({type: FETCH_FAQS, payload: response});
        })
      .catch((error) => console.log('err: ', error));
    }
  }
}

export function fetchFaqSubcategories(label) {
  return function(dispatch){
    axios.get(`${API_BASE_URL}/spaces/${TEST_SPACE_ID}/entries?access_token=${TEST_CONTENT_PREVIEW_TOKEN}&content_type=faqSubcategory&fields.categoryLabel=${label}&order=fields.order&locale=*`)
    .then( (response) => { 
      dispatch({type: FETCH_FAQ_SUBCATEGORIES, payload: response});
      })
    .catch((error) => console.log('err: ', error));
  }
}

export function fetchStages(id) {
  return function(dispatch){
    axios.get(`${API_BASE_URL}/spaces/${TEST_SPACE_ID}/entries?access_token=${TEST_CONTENT_PREVIEW_TOKEN}&content_type=stage&fields.categories.sys.id=${id}&order=fields.order&locale=*`)
    .then((response) => {
       const stages = response.data.items.map((stage) => ({
          partyLabel: stage.fields.partyLabel, 
          parties: stage.fields.parties, 
          title: stage.fields.title, 
          imageId: stage.fields.image['en-US'].sys.id, 
          id: stage.fields.order['en-US'], 
          slug: stage.fields.slug['en-US']}))
        .sort((a, b) => a.order - b.order);
       console.log("returned ordered stages: ", stages);
       dispatch({
         type: FETCH_STAGES,
         payload: stages
       });                                  
    })
    .catch((error) => console.log("err: ", error));
  }
  
}

export function fetchVideos() {
  const request = axios.get(`${API_BASE_URL}/spaces/${TEST_SPACE_ID}/entries?access_token=${TEST_CONTENT_PREVIEW_TOKEN}&content_type=video`)
  return {
    type: FETCH_VIDEOS,
    payload: request
  };
}

export function fetchVideoLinks() {
  const request = axios.get(`${API_BASE_URL}/spaces/${TEST_SPACE_ID}/entries?access_token=${TEST_CONTENT_PREVIEW_TOKEN}&content_type=videoLink`)
  return {
    type: FETCH_VIDEO_LINKS,
    payload: request
  };
}

export function fetchVideoCategories() {
  const request = axios.get(`${API_BASE_URL}/spaces/${TEST_SPACE_ID}/entries?access_token=${TEST_CONTENT_PREVIEW_TOKEN}&content_type=videoSubcategory`)
  return {
    type: FETCH_VIDEO_CATEGORIES,
    payload: request
  };
}

export function fetchContentByParty(id, party) {
  return function(dispatch){
    axios.get(`${API_BASE_URL}/spaces/${TEST_SPACE_ID}/entries?access_token=${TEST_CONTENT_PREVIEW_TOKEN}&content_type=stageContent&fields.categories.sys.id=${id}&fields.parties.sys.id=${party}&order=sys.createdAt&locale=*`)
    .then( (response) => { 
      console.log('fetch stageContent action', response)
      //retrieve essential data      
      const childEntries = response.data.includes.Entry.filter(ent => ent.sys.contentType.sys.id === "stageContentSub")
      const selectedTabs = response.data.items.reduce((acc, cur) => {
        //create duplicate entries for different stages if existent
        for (let i=0; i < cur.fields.stage['en-US'].length; i++){
             acc.push({
              title: cur.fields.title, 
              blockText: cur.fields.blockText, 
              id: cur.fields.id['en-US'], 
              sysId: cur.sys.id, 
              stageId: cur.fields.stage['en-US'][i].sys.id, 
              children: cur.fields.children});
        }
        return acc;
      }, []);
      let tabs = [{"children": childEntries}, {"tabs": selectedTabs}]
      dispatch({type: FETCH_CONTENT, payload: tabs});
      })
    .catch((error) => console.log("err: ", error));
  }
}

export function fetchSubContentById(id) {
  return function(dispatch) {
    axios.get(`${API_BASE_URL}/spaces/${TEST_SPACE_ID}/entries?access_token=${TEST_CONTENT_PREVIEW_TOKEN}&content_type=stageContent&sys.id=${id}&locale=*`)
    .then((response) => {
      const subContent = response.data.includes.Entry.filter(ent => ent.sys.contentType.sys.id === "stageContentSub").map(item => item.fields)
      dispatch({type: FETCH_SUBCONTENT, payload: subContent})
    })
  }
}

export function fetchResourceLinks(id) {
  return function(dispatch){
    axios.get(`${API_BASE_URL}/spaces/${TEST_SPACE_ID}/entries?access_token=${TEST_CONTENT_PREVIEW_TOKEN}&content_type=resource&fields.categories.sys.id=${id}&locale=*`)
      .then((response) => {
        const resources = response.data.items.map(resource => ({
          slug: resource.fields.slug['en-US'], titles: resource.fields.title, resourceId: resource.sys.id
        }));
        dispatch({
          type: FETCH_RESOURCE_LINKS,
          payload: resources
        })
      })
      .catch((error) => console.log("err: ", error))
    }
}

export function fetchChecklist() {
  return function(dispatch){
    axios.get(`${API_BASE_URL}/spaces/${TEST_SPACE_ID}/entries?access_token=${TEST_CONTENT_PREVIEW_TOKEN}&content_type=checklistItem&locale=*`)
      .then((response) => {
        console.log('checklist fetch payload', response.data.items)
        dispatch({
          type: FETCH_CHECKLIST,
          payload: response
        })
      })
      .catch((error) => console.log("err: ", error))
    }
}

export function fetchContactPage() {
  return function(dispatch){
    axios.get(`${API_BASE_URL}/spaces/${TEST_SPACE_ID}/entries?access_token=${TEST_CONTENT_PREVIEW_TOKEN}&content_type=contact&locale=*`)
      .then((response) => {
        dispatch({
          type: FETCH_CONTACT_LAYOUT,
          payload: response
        })
      }) 
      .catch((error) => console.log("err: ", error))
    }
}

export function fetchMenuLinks() {
  return function(dispatch){
    axios.get(`${API_BASE_URL}/spaces/${TEST_SPACE_ID}/entries?access_token=${TEST_CONTENT_PREVIEW_TOKEN}&content_type=menuLink&order=fields.order&locale=*`)
      .then((response) => {
        dispatch({
          type: FETCH_MENU_LINKS,
          payload: response
        })
      })
      .catch((error) => console.log("err: ", error))
    }
}

export function fetchFooter() {
  return function(dispatch){
    axios.get(`${API_BASE_URL}/spaces/${TEST_SPACE_ID}/entries?access_token=${TEST_CONTENT_PREVIEW_TOKEN}&content_type=footer&locale=*`)
      .then((response) => {
        const footerSections = response.data.includes.Entry;
        dispatch({
          type: FETCH_FOOTER_LAYOUT,
          payload: footerSections
        })
      })
      .catch((error) => console.log("err: ", error))
    }
}

export function fetchAsset(id) {
  return function(dispatch){

     axios.get(`${API_BASE_URL}/spaces/${TEST_SPACE_ID}/assets/${id}?access_token=${TEST_CONTENT_PREVIEW_TOKEN}`)
     .then((response) => {
      const asset = {
        assetId: response.data.sys.id,
        url: response.data.fields.file.url,
        alt: response.data.fields.file.fileName,
     };
      dispatch({
        type: FETCH_ASSET,
        payload: asset })
    })
     .catch((error) => console.log("err: ", error))
 }
}

// =======================================
// actions related to content manipulation
// =======================================
export function saveId(id) {
   return {
    type: SAVE_ID,
    payload: id
   }
}

export const storeStageId = (title, id) => {
  const newObject = {
    title: title,
    id: id
  }
  return {
    type: STORE_STAGE_ID,
    payload: newObject
  }
}

export function toggleLanguages(lang){
  return function(dispatch) {
    dispatch({ type: "TOGGLE_LANGUAGE", language: lang})
  }
}