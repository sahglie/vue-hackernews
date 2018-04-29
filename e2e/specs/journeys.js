module.exports = {
  'takes user to the item page': function(browser) {
    browser
      .url(`http://localhost:8080`)  // #A
      .waitForElementVisible('.news-item',  15000) // #B
      .click('.comments-link') // #C
      .assert.urlContains(`/item`) // #D
      .waitForElementVisible('.item-view',  15000) // #E
      .end();
  },

  'clicking on a user redirects to  the user page': function(browser) {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('.news-item',  15000)
      .click('.by a') // #A
      .assert.urlContains(`/user`) // #B
      .waitForElementVisible('.user-view',  30000) // #C
      .end();
  },

  'paginates items correctly': function(browser) {
    let originalItemListText;
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('.news-item',  15000) // #A
      .getText('.item-list', function(result) { // #B
        originalItemListText = result.value
      })
      .click('.item-list-nav a:nth-of-type(2 )') // #C
      .waitForElementNotVisible('.progress',  15000) // #D
      .perform(() => { //#E
        browser.expect.element('.item-list').text.to.not.equal(originalItemListText, 'More detailed message what is wrong.')
      })
      .getText('.item-list', function(result) { // #F
        originalItemListText = result.value
      })
      .click('.item-list-nav a') // #G
      .waitForElementNotVisible('.progress',  15000)
      .perform(() => { // #H
        browser.expect.element('.item-list').text.to.not.equal(originalItemListText)
      })
    },

    'changes list by clicking through nav': function(browser) {
      let originalItemListText;
      browser
        .url('http://localhost:8080')
        .waitForElementVisible('.news-item',  15000) //#A
        .getText('.item-list', function(result) { // #B
          originalItemListText = result.value
        })
        .click('.inner a:nth-of-type(2)') // #C
        .waitForElementNotVisible('.progress',  15000)
        .perform(() => {
          browser.expect.element('.item-list').text.to.not.equal(originalItemListText) // #D
        })
        .getText('.item-list', function(result) { // #E
          originalItemListText = result.value
        })
        .click('.inner a:nth-of-type(4)') // #F
        .waitForElementNotVisible('.progress',  15000)
        .perform(() => {
          browser.expect.element('.item-list').text.to.not.equal(originalItemListText) // #G
        })
      }    
    
}
