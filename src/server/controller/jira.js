const axios = require('axios');

const buildReport = (req, res) => {

    function getIssueInfo(issueKey, workspace) {
        return axios.get('https://' + workspace + '/rest/api/2/issue/' + issueKey, {
            auth: {
                username: req.body.jiraEmail,
                password: req.body.atlassianToken
            }
        }).then((issue) => {
            return issue;
        })
    }

    let requests = [
        axios.get('https://api.tempo.io/core/3/worklogs/user/' + req.body.jiraWorklogUsername, {
            params: {
                from: req.body.jiraDate,
                to: req.body.jiraDate,
            },
            headers: {'Authorization': "Bearer " + req.body.token}
        })
    ]

    if (req.body.jiraWorklogUsername2.length && req.body.token2.length) {
        requests.push(axios.get('https://api.tempo.io/core/3/worklogs/user/' + req.body.jiraWorklogUsername2, {
            params: {
                from: req.body.jiraDate,
                to: req.body.jiraDate,
            },
            headers: {'Authorization': "Bearer " + req.body.token2}
        }));
    }

    axios.all(requests).then(axios.spread((response, response2) => {
        let responseData = {};
        responseData.pendingIssues = [];
        responseData.worklog = response.data.results;
        if (req.body.jiraWorklogUsername2.length && req.body.token2.length) {
            responseData.worklog = response.data.results.concat(response2.data.results);
        }
        let itemsCount = responseData.worklog.length;

        if (responseData.worklog.length > 0) {
            responseData.worklog.forEach(function (element, index) {
                let workspace = /:\/\/([^\/]+)/.exec(element.issue.self)[1];
                getIssueInfo(element.issue.key, workspace).then((response) => {
                    element.issue.name = response.data.fields.summary;
                    itemsCount--;
                    if (itemsCount === 0) {
                        res.success(responseData);
                    }
                }).catch(function (key) {
                    res.error(500, 'Internal error, please check your credentials', 500);
                });
            });
        } else {
            res.success(responseData);
        }

    })).catch(function (response) {
        let errorMessages = response.message;
        console.log(response);
        if (response.response.data.errors && response.response.data.errors.length > 0) {
            errorMessages = response.response.data.errors[0].message;
        } else if (response.response.status === 401) {
            errorMessages = 'Invalid credentials. Unauthorized';
        }

        res.error(response.response.status, 'Jira response: ' + errorMessages, response.response.status);
    });
};

module.exports = {
    buildReport
}