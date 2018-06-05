// import { FETCH_PAGE_DATA, ERROR_RESPONSE } from '../actions/types';
import { FETCH_CATEGORIES } from '../actions/types';
import { FETCH_PARTIES } from '../actions/types';
import { FETCH_FAQS } from '../actions/types';
import { FETCH_FORMS } from '../actions/types';
import { FETCH_PAGE } from '../actions/types';
import { FETCH_FAQ_LAYOUT } from '../actions/types';
import { FETCH_CONTACT_LAYOUT } from '../actions/types';
import { FETCH_FORM_LAYOUT } from '../actions/types';
import { FETCH_FOOTER_LAYOUT } from '../actions/types';
import { FETCH_MENU_LINKS } from '../actions/types';
import { FETCH_FAQ_SUBCATEGORIES } from '../actions/types';
import { FETCH_CONTENT } from '../actions/types';
import { SAVE_ID } from '../actions/types';
import { FETCH_RESOURCE_LINKS } from '../actions/types';
import { FETCH_STAGES } from '../actions/types';
import { FETCH_VIDEOS } from '../actions/types';
import { FETCH_VIDEO_LINKS } from '../actions/types';
import { FETCH_VIDEO_CATEGORIES } from '../actions/types';

import { STORE_STAGE_ID } from '../actions/types';

const has = require('has-own-property-x');

const INITIAL_STATE = { 
  categories: [],
  parties: [],
  contactTitle: [],
  contactSections: [],
  stages: [],
  resources: [],
  formLayout: [],
  formTopics: [],
  formLists: [],
  faqs: [],
  faqTopics: [],
  faqLayout: [],
  faqSubcategories: [],
  footer: [],
  menuLinks: [],
  tabs: [], 
  videos: {},
  videoURLs: {},
  videoLinks: {},
  videoCategories: {},
  stageId: [],
  language: 'en-US'
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case FETCH_CATEGORIES:
    return { ...state, categories: action.payload };
  case FETCH_PARTIES:
    return { ...state, parties: action.payload };
  case FETCH_FORM_LAYOUT:
    const sortedFormTopics = action.payload.data.includes.Entry.sort((a, b) => {a.fields.order["en-US"] - b.fields.order["en-US"]})
    return { ...state, formTopics: sortedFormTopics, formLayout: action.payload.data.items };
  case FETCH_FORMS:
    return { ...state, formLists: action.payload.data.items };
  case FETCH_FAQ_LAYOUT:
    const sortedFaqTopics = action.payload.data.includes.Entry.sort((a, b) => {a.fields.order["en-US"] - b.fields.order["en-US"]})
    return { ...state, faqTopics: sortedFaqTopics, faqLayout: action.payload.data.items };
  case FETCH_FAQS:
    return { ...state, faqs: action.payload.data.items };
  case FETCH_FAQ_SUBCATEGORIES:
    return { ...state, faqSubcategories: action.payload.data.items };
  case FETCH_FOOTER_LAYOUT:
    return { ...state, footer: action.payload.data };
  case FETCH_MENU_LINKS:
    return { ...state, menuLinks: action.payload.data.items };
  case FETCH_CONTACT_LAYOUT:
    const contactTitle = action.payload.data.items[0].fields.title;
    const contactSections = action.payload.data.includes.Entry;
    return { ...state, contactTitle, contactSections };
  case FETCH_CONTENT:
    return { ...state, tabs: action.payload };
  case SAVE_ID:
    return { ...state, tabId: action.payload };
  case FETCH_STAGES:
    return { ...state, stages: action.payload };
  
  case FETCH_VIDEO_CATEGORIES: {
    const videos = { ...state.videos };
    const videoCategories = {};

    let items = action.payload.data.items;

    items.sort((a, b) => {
      if (a.fields.categoryId > b.fields.categoryId) {
        return 1;
      }

      if (a.fields.categoryId < b.fields.categoryId) {
        return -1;
      }

      return 0;
    });

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const id = item.sys.id;
      const categoryId = item.fields.categoryId;
      const categoryTitle = item.fields.categoryTitle;

      if (!has(videoCategories, item.fields.categoryId)) {
        videoCategories[categoryId] = {
          id: categoryId,
          title: categoryTitle,
          subcategories: {}
        };
      }

      const subcategories = videoCategories[categoryId].subcategories;

      subcategories[id] = {
        id,
        title: item.fields.title,
        categoryId: item.fields.categoryId,
        categoryTitle: item.fields.categoryTitle,
      };

      if (!has(videos, id)) {
        videos[id] = {
          id,
          videos: {}
        };
      }

      const subcategory = { ...videos[id], title: item.fields.title };
      videos[id] = subcategory;
    }

    return { ...state, videoCategories, videos };
  }

  case FETCH_VIDEOS: {
    const videos = { ...state.videos };
    const videoURLs = {};

    const assets = action.payload.data.includes.Asset;
    const items = action.payload.data.items;

    const alphasort = (a, b) => {
      if (a.fields.title > b.fields.title) {
        return 1;
      }
      else if (a.fields.title < b.fields.title) {
        return -1;
      }

      return 0;
    };

    assets.sort(alphasort);
    items.sort(alphasort);

    for (let i = 0; i < assets.length; i++) {
      const asset = assets[i];
      const url = asset.fields.file.url;

      const item = items[i];
      const title = item.fields.title;
      const subcategoryId = item.fields.subcategory.sys.id;
      
      videoURLs[asset.fields.title] = url;

      if (!has(videos, subcategoryId)) {
        videos[subcategoryId] = {
          id: subcategoryId,
          title: '',
          videos: {}
        };
      }

      const subcategory = videos[subcategoryId];

      subcategory.videos[item.sys.id] = {
        id: item.sys.id,
        linkTo: asset.fields.title,
        subcategory: subcategoryId,
        url,
        title,
      };
    }

    return { ...state, videos, videoURLs };
  }

  case FETCH_VIDEO_LINKS: {
    const videoLinks = {};
    const items = action.payload.data.items;

    items.sort((a, b) => {
      if (a.fields.videoId > b.fields.videoId) {
        return 1;
      }
      else if (a.fields.videoId < b.fields.videoId) {
        return -1;
      }

      return 0;
    })

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const categoryId = item.fields.categoryId;

      if (!has(videoLinks, categoryId)) {
        videoLinks[categoryId] = {
          id: categoryId,
          title: item.fields.categoryTitle,
          links: {},
        };
      }

      const category = videoLinks[categoryId];

      category.links[item.fields.title] = { 
        id: item.fields.videoId, 
        title: item.fields.title, 
        link: item.fields.link
      };
    }

    return { ...state, videoLinks };
  }

  case FETCH_RESOURCE_LINKS:
    return { ...state, resources: action.payload };
  case STORE_STAGE_ID:
    return { ...state, stageId: action.payload };
  
  case 'TOGGLE_LANGUAGE':
    return { ...state, language: action.language };
  default:
    return state;
  }
}

