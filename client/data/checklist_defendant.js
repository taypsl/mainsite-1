// content for small claims checklist/defendant
import { SMALL_CLAIMS, GUARDIANSHIP } from '../src/actions/types.js'; 
const checklistTemplateDefendant = {
	'smallClaims' : 
	[
		{
			"title": "Review SC-100",
			"blockText": "Carefully read and review the Form SC-100. Write down the date of your hearing. Note where you are being sued.",
			"id": 1,
			"completed":false,
			"stage": 1
		},
		{
			"title": "Settle or Pay Plaintiff",
			"blockText": "<p>If you and the person suing have not spoken, try to talk to them to work things out. If you do owe them money, pay it. Be sure to get a receipt. If you think you owe a different amount or you can’t pay the total amount, see if you can work out a deal. He or she may be willing to take less or let you make payments.</p><p>It may help for you and the other person to talk to a neutral third party, a mediator. For information on mediation and finding a mediator, read <a href='http://www.cc-courthelp.org/default.aspx?Lang=ENG&Parent=268'>“What is Mediation?”</a></p>",
			"id": 2,
			"completed":false,
			"stage": 1
		},
		{
			"title": "Decide whether to Counter-Sue",
			"blockText": "If you think the person who sued you owes you money, you can sue them back in the same case. Keep in mind, you cannot ask for more than $10,000 in small claims. Read <a href='http://www.courts.ca.gov/documents/sc100info.pdf'>SC-100-INFO </a>for the rules on suing in small claims court. If you decide to sue the person back: <ol><li><p>Fill-out <a href='http://www.courts.ca.gov/documents/sc120.pdf'>SC-120</a></p><p>You may review what you filled out with your court's small claims advisor. Also be sure to check on your court's website or with a court clerk whether there are any local forms you need to fill-out. When you are done, make two copies of the form.</p></li><li><p>File SC-120</p><p>Take your completed forms to the small claims court clerk in the court where you are being sued. The clerk will stamp the copies of your forms and keep the original.</p><p>You will have to pay a filing fee. If you can’t afford the fee, you may ask for a fee waiver. To find out if you qualify, read a <a href='http://www.courts.ca.gov/documents/fw001info.pdf'>Fee Waiver Information Sheet</a>. If you do qualify, you’ll need to fill out <a href='http://www.courts.ca.gov/documents/fw001.pdf'>FW-001</a>.</p></li><li><p>Serve SC-104</p><p>Have your forms served on the Plaintiff. To learn more about how service is done, go to <a href='http://www.cc-courthelp.org/default.aspx?Lang=ENG&Parent=223'>“Step 3: Serve Your Court Forms.”</a></p><p>The person who served the forms must fill out a Proof of Service, form SC-104. (http://www.courts.ca.gov/documents/sc104.pdf) To learn more about Proof of Service and how to fill out the form, read <a href='http://www.courts.ca.gov/documents/sc104b.pdf'>“What is Proof of Service?”</a></p></li><li><p>File Proof of Service Sc-104 for SC-120</p><p>Make two copies of the completed Sc-104, Proof of Service, and file it with court clerk. You should file the Proof of Service form 5 days before the trial.</p></li></ol>",
			"id": 3,
			"completed":false,
			"stage": 1
		},
		{
			"title": "Other Possible Responses",
			"blockText": "<p>In addition to paying the person or going to trial and trying to win, you may also consider whether the person suing you:</p><ul><li>Waited too long to sue you</li><li>Served you the wrong way</li><li>Sued you in the wrong Court</li></ul><p>If any of these are true, you can ask the court to dismiss the case. You can find more about these in the <a href='http://www.cc-courthelp.org/?Lang=ENG&Parent=268'>During Your Case</a></p>",
			"id": 4,
			"completed":false,
			"stage": 1
		},
		{
			"title": "Request to Postpone Trial",
			"blockText": "<p>If you are unable to go to the court date, for a very good reason, you can ask the court for a new court date. To do so, fill-out <a href='http://www.courts.ca.gov/documents/sc150.pdf'>SC-150</a>. Make two copies of the form and file it with the court. There may be a filing fee.</p><p>Have someone, other than you, serve copy on the other person in the case—by mail or in person. The server must then fill-out and file SC-104 (if by person) or Sc-112A (if by mail). </p>",
			"id": 5,
			"completed":false,
			"stage": 1
		},
		{
			"title": "Prepare for Trial",
			"blockText": "<ul><li>Make copies of all the documents you need for court, such as bills or receipts. Make a copy for the judge, yourself, and the other person.</li><li>Gather any evidence you need and arrange for any witnesses to come on the day of trial.</li><li>If you need an interpreter, ask the court at least a week whether they provide interpreters or if you need to bring your own, such as a friend or family member.</li><li>Practice what it is you plan to say in court. Keep your story short and to the point.</li><li>Figure out where the Court is and plan how to get there.</li></ul><p>The Small Claims section of this site has more information on <a href='http://www.cc-courthelp.org/default.aspx?Lang=ENG&Parent=223'>preparing for trial</a>.</p>",
			"id": 6,
			"completed":false,
			"stage": 1
		},
		{
			"title": "Review the Notice of Entry of Judgement",
			"blockText": "Within 90-days of the date of your trial, you will receive a Notice of Entry of Judgment. Read it carefully. It will say who won and if anyone owes money. The form also has information on your options if you won or lost. You can also find this information on <a href='http://www.cc-courthelp.org/default.aspx?Lang=ENG&Parent=223'>Form Sc-200-INFO</a>.",
			"id": 7,
			"completed":false,
			"stage": 2
		},
		{
			"title": "Acknowledgment of Satisfaction of Judgment",
			"blockText": "<p>Once you are paid a portion or all of the debt, you will need to file an Acknowledgement of Satisfaction of Judgement. To learn how to do this and which form to file, read <a href='http://www.cc-courthelp.org/default.aspx?Lang=ENG&Parent=224'>“When the Judgement Debtor Has Paid in Full”</a>.</p><p>If you are the one who paid a debt, make sure that the person you owed the money to files an Acknowledgement of Satisfaction of Judgement.</p>",
			"id": 8,
			"completed":false,
			"stage": 2
		},
		{
			"title": "Motion to Vacate Judgment",
			"blockText": "<p>If you did not show-up to your court date for a very good reason and the judge ruled against you, you can file a motion to vacate the judgment—that means to cancel what the judge ruled and give you a new court date. To do this, you will need file <a href='http://www.courts.ca.gov/documents/sc135.pdf'>Form SC-135</a>.</p><p>To learn more about how to complete and file this motion, read <a href='http://www.cc-courthelp.org/?Lang=ENG&Parent=268'>“How do I Ask the Court to Cancel a Default Judgment?”</a> It explains what you’ll need to do and has important deadlines you will need to follow.</p>",
			"id": 9,
			"completed":false,
			"stage": 2
		},
		{
			"title": "Appeal the Judgment",
			"blockText": "Only the person who owes money can appeal. An appeal is a new trial in front of a superior court judge. You can have an attorney at the new trial. To appeal the case, you must file <a href='http://www.courts.ca.gov/documents/sc140.pdf'>SC-140, a Notice of Appeal</a>, within 30-days of the date the Court mailed you the Notice of Entry of Judgment.",
			"id": 21,
			"completed":false,
			"stage": 2
		}
	]
};
export default checklistTemplateDefendant;