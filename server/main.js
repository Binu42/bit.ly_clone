import { Meteor } from 'meteor/meteor';
import { Employees } from '/imports/api/employee';
import { image, helpers } from 'faker';
import _ from 'lodash'

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (Employees.find({}).count() === 0) {
    _.times(5000, () => {
      const { name, username, email, phone } = helpers.createCard();

      Employees.insert({ name, username, email, phone, avatar: image.avatar() });
    })
  }

  Meteor.publish('employees', (per_page) => {
    return Employees.find({}, { limit: per_page });
  })
});
