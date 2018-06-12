// // // import svgs
// // import AdoptionIcon from '../../../../img/family_adoption.svg';
// // import ChildCustodyIcon from '../../../../img/family_child-custody.svg';
// // import ChildSupportIcon from '../../../../img/family_child-support.svg';
// // import SpousalSupportIcon from '../../../../img/family_spousal-support.svg';
// // import ParentageIcon from '../../../../img/family_parentage.svg';
// // import DivorceIcon from '../../../../img/family_divorce.svg';

// // export default class FamilyHome extends Component {
// // 	render() {
// // 		return (
// // 			<div className='Topic'>
// // 	      <div className="mainpage-title">
// //             <hr className="mainpage-title-line" />
// //             <h1>Family Law</h1>
// //             <hr className="mainpage-title-line"/>
// //           </div> 
// // 	      <div className='grid grid-pad'>
// // 	        <Link to='adoption'>
// // 	        	<Squarebox 
// // 	        		boxTitle='Adoption'
// //             		imgSrc={AdoptionIcon} /> 
// //             </Link>
// // 	        <Squarebox 
// // 	        	boxTitle='Child Custody'
// //             imgSrc={ChildCustodyIcon} /> 
// // 					<Squarebox 
// // 						boxTitle='Child Support'
// //             imgSrc={ChildSupportIcon} /> 
// // 					<Squarebox 
// // 						boxTitle='Spousal Support'
// //             imgSrc={SpousalSupportIcon} /> 
// // 					<Squarebox 
// // 						boxTitle='Parentage'
// //             imgSrc={ParentageIcon} /> 
// // 					<Squarebox 
// // 						boxTitle='Divorce'
// //             imgSrc={DivorceIcon} /> 
// // 	      </div>
// // 		  </div>
// // 		)
// // 	}
// // }

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { fetchCategories } from '../../actions/content.js';
// import Squarebox from '../template/square-box';
// import Asset from '../template/responsive-image';
// import client from '../../services/contentful-client'
// import TitleLine from '../template/title-line';
// import { DEFAULT_LANG } from '../../actions/types'; 

// class FamilyHome extends React.Component {
//   componentWillMount() {
//       this.props.categories.length === 0 && this.props.fetchSubCategories()
//   }

//   // componentDidMount() {
//   //   client.getEntries({content_type: 'category'}).then((response) => {
//   //     this.setState({categories: response.items})
//   //   })
//   // }

//   renderCategories() {
//     const lang = this.props.language;
//     console.log("language: ", lang);
//     console.log("this.props.categories", this.props.categories)
//     return this.props.categories.map((category) => {
//       return (
//         <div className="Square-box-container" key={category.id}>
//           <Link to={ category.url }>
//             <Squarebox 
//               id={category.id}
//               boxTitle={ category.titles[lang] }  
//               assetId={ category.imageId }
//             />
//           </Link>
//         </div>
//       );
//     });
//   }

//   render() {
//     return (
//       <div className="mainpage">
//         <TitleLine title="Self-Help Law Center" />
//         <div className="grid grid-pad">
//           {this.renderCategories()}
//         </div>
//       </div>
//     );
//   }
// }

// function mapStateToProps(state) {
//   return { 
//     categories: state.content.categories,
//     language: state.content.language,
//    };
// }

// export default connect(mapStateToProps, { fetchCategories })(FamilyHome);


