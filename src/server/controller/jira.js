const axios = require('axios');

const buildReport = (req, res) => {

    function getIssueInfo(issueKey) {
        return axios.get('https://' + req.body.workspace + '.atlassian.net/rest/api/2/issue/' + issueKey, {
            auth: {
                username: req.body.jiraEmail,
                password: req.body.atlassianToken
            }
        }).then((issue) => {
            return issue;
        })
    }

    axios.all(
        [
            axios.get('https://api.tempo.io/core/3/worklogs/user/' + req.body.jiraWorklogUsername, {
                params: {
                    from: req.body.jiraDate,
                    to: req.body.jiraDate,
                },
                headers: {'Authorization': "Bearer " + req.body.token}
            })
        ]
    ).then(axios.spread((response) => {
        let responseData = {};
        responseData.pendingIssues = [];
        responseData.worklog = response.data.results;
        let itemsCount = responseData.worklog.length;

        if (responseData.worklog.length > 0) {
            responseData.worklog.forEach(function (element, index) {
                getIssueInfo(element.issue.key).then((response) => {
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