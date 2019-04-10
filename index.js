const express = require('express')
const app = express()
const port = 3002
const fs = require('fs')
const get_ip = require('ipware')().get_ip;
const whoisjson = require('whois-json')

app.use(express.static('public'));

app.get('/', (req, res) => {
    const template = fs.readFileSync('./index.html', {encoding:'utf8'});
    const ip_info = get_ip(req);
    const result = template.replace(/{ip}/g, ip_info.clientIp);
    res.send(result);
});

app.get('/whois/:ip', (req, res) => {
    whoisjson(req.params.ip).then(results=>{
        res.json(results);
    })
})

app.listen(port, () => console.log(`Ik service listening on port ${port}!`))