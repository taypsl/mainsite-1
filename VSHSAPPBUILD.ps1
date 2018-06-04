$Date = Get-Date

Start-Transcript -Path D:\Websites\VSHS\NPMINSTALL.TXT
## STEP 1 NPM Quite Install
npm install --quiet node-gyp -g

## STEP 2 NPM INSTALL
npm install

## STEP 3 node_modules Install
node node_modules/webpack/bin/webpack.js --env.NODE_ENV=dev

## Restarting IIS 
IISRESET
Stop-Transcript 

Send-MailMessage -From "Dev-VSHS <DEV-VSHS@contracosta.courts.ca.gov>" -To "Virtual Self-help Team <l-vshs@contracosta.courts.ca.gov>" -Subject "NPM Install is complete $Date" -Body "Development VSHS Server NPM install has been completed" -Attachments "NPMINSTALL.TXT" -SmtpServer "adm-db-01.ad.cc-courts.org"

EXIT