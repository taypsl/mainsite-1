// content for small claims checklist/plaintiff
import { SMALL_CLAIMS, GUARDIANSHIP } from '../src/actions/types.js'; 
const checklistTemplatePlaintiff = 
{
	'smallClaims':
	[
		{
	   "title": "Read SC-100-INFO",
	   "blockText": "<p>The information sheet for SC-100 has helpful general information about small claims court. It explains important rules and processes you should know. You should read it before you file a claim.</p>",
	   "completed": false,
	   "stage": 0,
	   "id": 1
		},
		{
		 "title": "Ask for Payment",
		 "blockText": "<p>Before you can sue, you must ask the other person to pay you. You can ask in person, by phone, or by writing a letter or email. If there is a very good reason you did not ask before suing, you may still be able to sue, but you’ll have to explain why you never asked to the court.</p>",
		 "completed": false,
		 "stage": 0,
		 "id": 2
		},
		{
		 "title": "Write a Letter Asking for Payment",
		 "blockText": "<p>You can ask the other person to pay in person or over the phone, but sometimes it helps to ask in writing. By writing a letter or email, you can take the time to clearly explain to the other person why he or she owes you the money and why that amount is owed. If you need help to write a letter, the State has a <a href=\"http://www.courts.ca.gov/11145.htm\" target=\"_blank\" >computer program</a> that can help you write the letter.</p>",
		 "completed": false,
		 "stage": 0,
		 "id": 3
		},
		{
		 "title": "Consider Mediation",
		 "blockText": "<p>If talking to the person and asking for payment does not work, you may want to consider mediation. Mediation is when you and the other person meet with a neutral person to try to find a solution. For information on mediation and fining a mediator, read <a href=\"http://www.cc-courthelp.org/default.aspx?Lang=ENG&Parent=268\" target=\"_blank\">“What is Mediation?”</a></p>",
		 "completed": false,
		 "stage": 0,
		 "id": 4
		},
		{
		 "title": "Decide Where to File Your Claim",
		 "blockText": "<p>In order to sue in small claims, you have to first know where you can file your claim. Every County has a small claims court. There are rules about which one you can sue in. To learn more about where you can file you claim, read <a href=\" http://www.cc-courthelp.org/?Lang=ENG&Parent=222\" target=\"_blank\"> Find the Right Court to File Your Claim</a>. You can also talk to a small claims advisor.</p>",
		 "completed": false,
		 "stage": 0,
		 "id": 5
		},
		{
		 "title": "Find Out How to Name the Defendant",
		 "blockText": "<p>In order to file a small claims case, you will need to name the Defendant the proper way. This can sometimes be tricky for s business or corporation. To learn more read <a href=\"http://www.cc-courthelp.org/default.aspx?Lang=ENG&Parent=268\" target=\"_blank\">How Do I Name the Defendant in My Court Papers?</a>.</p>",
		 "completed": false,
		 "stage": 0,
		 "id": 6
		},
		{
		 "title": "Get and Fill-out Court Forms",
		 "blockText": "<p>To start a case in small claims court you will need to fill out:</p><ul><li>SC-100</li><li>Depending on which boxes you check on SC-100, you may need other forms such as SC-100A if you are suing more than two people, or SC-103 if you are suing a business with a fictitious business name.</li></ul> <p>In some counties, you may also need to fill out “local forms.” If there are any local forms, you can find them on your <a href=\"http://www.courts.ca.gov/find-my-court.htm\" target=\"_blank\">court’s website</a>. </p>",
		 "completed": false,
		 "stage": 0,
		 "id": 7
		},
		{
		 "title": "Check-in with Small Claims Advisor",
		 "blockText": "<p>You can ask your court’s <a href=\"http://www.courts.ca.gov/selfhelp-advisors.htm\" target=\"_blank\">small claims advisor</a> to look over the forms you filled out. Some small claims advisors also hold workshops you can attend.</p>",
		 "completed": false,
		 "stage": 0,
		 "id": 8
		},
		{
		 "title": "Fee Waivers",
		 "blockText": "<p>There is a filing fee to start a small claims case. If you are low-income you may qualify for a fee waiver. To find out if you qualify, read a <a href=\"http://www.courts.ca.gov/documents/fw001info.pdf\" target=\"_blank\">Fee Waiver Information Sheet</a>. If you do qualify, you’ll need to fill out <a href=\"http://www.courts.ca.gov/documents/fw001.pdf\" target=\"_blank\">FW-001.</a></p>",
		 "completed": false,
		 "stage": 0,
		 "id": 9
		},
		{
			"title": "File SC-100 to start your Small Claims case",
			"blockText": "<p>Bring (or mail) 2 copies and the original of SC-100, along with any other forms you completed – like a fee waiver – to the court clerk to file. In some counties, you may be able to file the forms electronically. Check your court’s website to see if they have e-filing.</p><p>If you do not have a fee waiver, you will have pay a fee when you file the forms. <a href=\"http://www.cc-courts.org/fees/docs/2017CivilFeeSchedule.pdf\" target=\"_blank\">Learn what the filing fee will be.</a></p><p>Once the clerk has the forms and filing fee, the clerk will stamp the copies of the forms and give you a court date. You will get a stamped copy of the forms back to serve of the Defendant.</p>",
			"id": 10,
			"completed":false,
			"stage": 1
		},
		{
			"title": "Serve the Defendant form SC-100",
			"blockText": "<p>Have your forms served on the Defendant. To learn more about how service is done, go to <a href=\"http://www.cc-courthelp.org/default.aspx?Lang=ENG&Parent=223\" target=\"_blank\">“Step 3: Serve Your Court Forms.”</a></p><p>The person who served the forms must fill out a Proof of Service, <a href=\"http://www.courts.ca.gov/documents/sc104.pdf\" target\"_blank\">form SC-104</a>. To learn more about Proof of Service and how to fill out the form, read <a href=\"http://www.courts.ca.gov/documents/sc104b.pdf\" target=\"_blank\">“What is Proof of Service?”</a></p>",
			"id": 11,
			"completed":false,
			"stage": 1
		},
		{
			"title": "File Proof of Service form SC-104",
			"blockText": "<p>Make two copies of the completed Sc-104, Proof of Service, and file it with court clerk. You should file the Proof of Service form 5 days before the trial.</p>",
			"id": 12,
			"completed":false,
			"stage": 1
		},
		{
			"title": "Prepare for Trial",
			"blockText": "<ul><li>Make copies of all the documents you need for court, such as bills or receipts. Make a copy for the judge, yourself, and the other person.</li><li>Gather any evidence you need and arrange for any witnesses to come on the day of trial.</li><li>If you need an interpreter, ask the court at least a week whether they provide interpreters or if you need to bring your own, such as a friend or family member.</li><li>Practice what it is you plan to say in court. Keep your story short and to the point.</li><li>Figure out where the Court is and plan how to get there.</li></ul><p>The Small Claims section of this site has more information on <a href=\"http://www.cc-courthelp.org/default.aspx?Lang=ENG&Parent=223\" target=\"_blank\" >preparing for trial</a>.</p>",
			"id": 13,
			"completed":false,
			"stage": 1
		},
		{
			"title": "Review the Judgement (Notice of Entry of Judgement)",
			"blockText": "<p>Within 90-days of the date of your trial, you will receive a Notice of Entry of Judgment. Read it carefully. It will say who won and if anyone owes money. The form also has information on your options if you won or lost. You can also find this information on <a href\"http://www.cc-courthelp.org/default.aspx?Lang=ENG&Parent=223\" target=\"_blank\">Form Sc-200-INFO</a>.</p>",
			"id": 14,
			"completed":false,
			"stage": 2
		}, 
		{
			"title": "Acknowledgment of Satisfaction of Judgment",
			"blockText": "<p>Once you are paid a portion or all of the debt, you will need to file an Acknowledgement of Satisfaction of Judgement. To learn how to do this and which form to file, read <a href=\"http://www.cc-courthelp.org/default.aspx?Lang=ENG&Parent=224\" target=\"\" >“When the Judgement Debtor Has Paid in Full”</a>.</p><p>If you are the one who paid a debt, make sure that the person you owed the money to files an Acknowledgement of Satisfaction of Judgement.</p>",
			"id": 15,
			"completed":false,
			"stage": 2
		},
		{
			"title": "Motion to Vacate Judgment",
			"blockText": "<p>If you did not show-up to your court date for a very good reason and the judge ruled against you, you can file a motion to vacate the judgment—that means to cancel what the judge ruled and give you a new court date. To do this, you will need file <a href=\"http://www.courts.ca.gov/documents/sc135.pdf\" target=\"_blank\">form SC-135</a>.</p><p>To learn more about how to complete and file this motion, read <a href=\"http://www.cc-courthelp.org/?Lang=ENG&Parent=268\" target=\"_blank\" >“How do I Ask the Court to Cancel a Default Judgment?”</a> It explains what you’ll need to do and has important deadlines you will need to follow.</p>",
			"id": 16,
			"completed":false,
			"stage": 2
		},
		{
			"title": "Appeal the Judgment",
			"blockText": "<p>Only the person who owes money can appeal. An appeal is a new trial in front of a superior court judge. You can have an attorney at the new trial. To appeal the case, you must file <a href=\"http://www.courts.ca.gov/documents/sc140.pdf\" target=\"_blank\">SC-140</a>, a Notice of Appeal, within 30-days of the date the Court mailed you the Notice of Entry of Judgment.</p>",
			"id": 17,
			"completed":false,
			"stage": 2
		}
	]
};
export default checklistTemplatePlaintiff;