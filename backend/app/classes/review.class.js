'use strict';

module.exports = class Review {
    constructor(uid, authorID, authorName, title, text, subjectID, studyLevelID, isPublic, created) {
        this.uid = uid;
        this.authorID = authorID;
        this.authorName = authorName;

        this.title = title;
        this.text = text;

        this.subjectID = subjectID;
        this.studyLevelID = studyLevelID;
        this.isPublic = isPublic;

        this.created = created;
    }

    setCid(cid) {
        this.cid = cid;
    }
}
