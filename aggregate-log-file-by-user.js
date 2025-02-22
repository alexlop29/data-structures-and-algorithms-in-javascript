/*
The content of this file mimics reading an arbitrarily large log file line by line. Your challenge is to parse each line in order to aggregate hourly data by user.

Please do all your work in Coderpad!
The logs you’re processing will be in chronological order
The “most_frequent_event” may be a tie. Which event is chosen in the event of a tie doesn’t matter.
Output data will be different than what’s shown below
Feel free to create as many new functions as necessary, but do not modify the readLogLine() function
Run the code as often as you like to test your changes
Printed output should be in the following format (pretty printing is not necessary):

[
  {
    "user_id": "user123",
    "hour": "2024-12-15T10:00:00",
    "total_events": 3,
    "unique_event_types": 3,
    "most_frequent_event": "page_view"
  },
  {
    "user_id": "user456",
    "hour": "2024-12-15T10:00:00",
    "total_events": 1,
    "unique_event_types": 1,
    "most_frequent_event": "button_click"
  },
  {
    "user_id": "user789",
    "hour": "2024-12-15T10:00:00",
    "total_events": 1,
    "unique_event_types": 1,
    "most_frequent_event": "page_view"
  },
  {
    "user_id": "user456",
    "hour": "2024-12-15T11:00:00",
    "total_events": 2,
    "unique_event_types": 2,
    "most_frequent_event": "page_view"
  },
  {
    "user_id": "user123",
    "hour": "2024-12-15T11:00:00",
    "total_events": 2,
    "unique_event_types": 2,
    "most_frequent_event": "api_call"
  },
  {
    "user_id": "user789",
    "hour": "2024-12-15T11:00:00",
    "total_events": 1,
    "unique_event_types": 1,
    "most_frequent_event": "button_click"
  },
  
  ... more data here ...
  
]
*/

const _ = require('lodash');

let aggregatedOutput = [];

for (const line of readLogLine()) {
  let currOutput = parseLogLine(line);

  if (aggregatedOutput.length === 0) {
    aggregatedOutput.push(currOutput);
    continue;
  }

  let previousOutput = aggregatedOutput[aggregatedOutput.length - 1];

  if (previousOutput.user_id === currOutput.user_id && previousOutput.most_frequent_event === currOutput.most_frequent_event) {
    aggregatedOutput[aggregatedOutput.length - 1] = {
      ...previousOutput,
      total_events: previousOutput.total_events + 1,
      unique_event_types: new Set([...previousOutput.unique_event_types, currOutput.most_frequent_event]).size
    };
  } else {
    aggregatedOutput.push(currOutput);
  }
}

function parseLogLine(line) {
  const [date, user, action, source] = line.split(",");
  return {
    user_id: user,
    hour: date,
    total_events: 1,
    unique_event_types: new Set([action]).size,
    most_frequent_event: action
  };
}

function parseByHour(input) {
  let userEventsByHour = {};

  for (const userEvent of input) {
    const userId = userEvent.user_id;
    const eventTime = userEvent.hour.slice(0, 13) + ":00";

    if (!(userId in userEventsByHour)) {
      userEventsByHour[userId] = [{ ...userEvent, hour: eventTime }];
      continue;
    }

    let userEvents = userEventsByHour[userId];
    let lastEvent = userEvents[userEvents.length - 1];

    if (lastEvent.hour === eventTime) {
      userEvents[userEvents.length - 1] =
        lastEvent.total_events >= userEvent.total_events ? lastEvent : userEvent;
    } else {
      userEvents.push({ ...userEvent, hour: eventTime });
    }
  }

  let result = [];

  for (const userId in userEventsByHour) {
    result.push(...userEventsByHour[userId]);
  }

  return result;

  return userEventsByHour;
}

function* readLogLine() {
  /**
   * DO NOT MODIFY THIS FUNCTION
   * 
   * Simulate reading from a log file, yielding one line at a time
   */
  const logs = 2024-12-15T08:00:01Z,user123,page_view,/home
2024-12-15T08:05:30Z,user123,page_view,/home
2024-12-15T08:10:10Z,user123,page_view,/trending
2024-12-15T08:15:15Z,user456,button_click,submit_form
2024-12-15T08:20:48Z,user456,api_call,/api/comments
2024-12-15T08:20:50Z,user123,page_view,/sale
2024-12-15T08:25:28Z,user456,api_call,/api/recently_viewed
2024-12-15T08:30:15Z,user303,button_click,start_live_chat
2024-12-15T08:30:32Z,user789,api_call,/api/products
2024-12-15T08:35:05Z,user789,button_click,share_product
2024-12-15T08:35:08Z,user456,api_call,/api/check_stock
2024-12-15T08:40:45Z,user789,button_click,write_review
2024-12-15T08:45:30Z,user123,page_view,/bulk_order
2024-12-15T08:45:45Z,user101,page_view,/about
2024-12-15T08:50:20Z,user101,page_view,/support
2024-12-15T08:50:25Z,user789,button_click,ask_question
2024-12-15T08:55:00Z,user101,page_view,/careers
2024-12-15T09:00:03Z,user202,button_click,add_to_cart
2024-12-15T09:00:48Z,user456,api_call,/api/warranty_check
2024-12-15T09:05:38Z,user202,api_call,/api/track_order
2024-12-15T09:05:40Z,user101,page_view,/how_it_works
2024-12-15T09:10:18Z,user202,api_call,/api/product_availability
2024-12-15T09:15:05Z,user789,button_click,submit_survey
2024-12-15T09:15:18Z,user123,api_call,/api/user_profile
2024-12-15T09:20:55Z,user303,button_click,download_app
2024-12-15T09:20:58Z,user202,api_call,/api/product_customization
2024-12-15T09:25:35Z,user303,button_click,toggle_dark_mode
2024-12-15T09:30:20Z,user101,page_view,/partner_program
2024-12-15T09:30:30Z,user303,page_view,/products
2024-12-15T09:35:10Z,user123,api_call,/api/notifications
2024-12-15T09:35:15Z,user303,button_click,share_wishlist
2024-12-15T09:40:50Z,user123,api_call,/api/recommended_products
2024-12-15T09:45:38Z,user202,api_call,/api/trade_in_value
2024-12-15T09:45:47Z,user456,api_call,/api/search
2024-12-15T09:50:28Z,user456,page_view,/categories
2024-12-15T09:50:30Z,user123,api_call,/api/order_history
2024-12-15T09:55:08Z,user456,page_view,/flash_sale
2024-12-15T10:00:05Z,user789,button_click,product_details
2024-12-15T10:00:55Z,user303,button_click,book_appointment
2024-12-15T10:05:45Z,user789,button_click,apply_filter
2024-12-15T10:05:48Z,user456,page_view,/seasonal_collection
2024-12-15T10:10:25Z,user789,button_click,set_price_alert
2024-12-15T10:15:10Z,user123,api_call,/api/subscription_status
2024-12-15T10:15:20Z,user101,api_call,/api/contact
2024-12-15T10:20:00Z,user101,api_call,/api/feedback
2024-12-15T10:20:05Z,user789,button_click,toggle_size_unit
2024-12-15T10:25:40Z,user101,api_call,/api/gift_wrap
2024-12-15T10:30:28Z,user456,page_view,/limited_edition
2024-12-15T10:30:38Z,user202,page_view,/cart
2024-12-15T10:35:18Z,user202,page_view,/privacy
2024-12-15T10:35:20Z,user101,api_call,/api/referral_program
2024-12-15T10:40:58Z,user202,page_view,/brand_directory
2024-12-15T10:45:45Z,user789,button_click,request_catalog
2024-12-15T10:45:55Z,user303,button_click,remove_from_cart
2024-12-15T10:50:35Z,user303,button_click,change_language
2024-12-15T10:50:38Z,user202,page_view,/style_guide
2024-12-15T10:55:15Z,user303,button_click,follow_brand
2024-12-15T11:00:00Z,user101,api_call,/api/product_alert
2024-12-15T11:00:10Z,user123,page_view,/settings
2024-12-15T11:05:50Z,user123,page_view,/offers
2024-12-15T11:05:55Z,user303,button_click,create_account
2024-12-15T11:10:30Z,user123,page_view,/clearance
2024-12-15T11:15:18Z,user202,page_view,/affiliate_program
2024-12-15T11:15:28Z,user456,button_click,update_profile
2024-12-15T11:20:08Z,user456,api_call,/api/compare_products
2024-12-15T11:20:10Z,user123,page_view,/exclusive_deals
2024-12-15T11:25:48Z,user456,api_call,/api/size_recommendation
2024-12-15T11:30:35Z,user303,button_click,leave_feedback
2024-12-15T11:30:45Z,user789,api_call,/api/reviews
2024-12-15T11:35:25Z,user789,button_click,add_to_wishlist
2024-12-15T11:35:28Z,user456,api_call,/api/product_comparison
2024-12-15T11:40:05Z,user789,button_click,add_to_compare
2024-12-15T11:45:00Z,user101,page_view,/faq
2024-12-15T11:45:50Z,user123,page_view,/student_discount
2024-12-15T11:50:40Z,user101,page_view,/returns
2024-12-15T11:50:45Z,user789,button_click,apply_promo_code
2024-12-15T11:55:20Z,user101,page_view,/sustainability
2024-12-15T12:00:08Z,user456,api_call,/api/installment_options
2024-12-15T12:00:18Z,user202,api_call,/api/order_status
2024-12-15T12:05:00Z,user101,page_view,/customer_stories
2024-12-15T12:05:58Z,user202,api_call,/api/shipping_options
2024-12-15T12:10:38Z,user202,api_call,/api/virtual_try_on
2024-12-15T12:15:25Z,user789,button_click,customize_product
2024-12-15T12:15:35Z,user303,button_click,submit_review
2024-12-15T12:20:15Z,user303,button_click,rate_app
2024-12-15T12:20:18Z,user202,api_call,/api/gift_registry
2024-12-15T12:25:55Z,user303,button_click,save_for_later
2024-12-15T12:30:40Z,user101,page_view,/brand_story
2024-12-15T12:30:50Z,user123,api_call,/api/logout
2024-12-15T12:35:30Z,user123,api_call,/api/payment_methods
2024-12-15T12:35:35Z,user303,button_click,schedule_delivery
2024-12-15T12:40:10Z,user123,api_call,/api/loyalty_points
2024-12-15T12:45:08Z,user456,page_view,/blog
2024-12-15T12:45:58Z,user202,api_call,/api/reorder
2024-12-15T12:50:48Z,user456,page_view,/gift_cards
2024-12-15T12:50:50Z,user123,api_call,/api/return_request
2024-12-15T12:55:28Z,user456,page_view,/new_arrivals
2024-12-15T13:00:15Z,user303,button_click,join_waitlist
2024-12-15T13:00:25Z,user789,button_click,subscribe_newsletter
2024-12-15T13:05:05Z,user789,button_click,redeem_coupon
2024-12-15T13:05:08Z,user456,page_view,/lookbook
2024-12-15T13:10:45Z,user789,button_click,zoom_image
2024-12-15T13:15:30Z,user123,api_call,/api/product_recall
2024-12-15T13:15:40Z,user101,api_call,/api/wishlist
2024-12-15T13:20:20Z,user101,api_call,/api/store_locator
2024-12-15T13:20:25Z,user789,button_click,toggle_product_view
2024-12-15T13:25:00Z,user101,api_call,/api/bundle_offers
2024-12-15T13:30:48Z,user456,page_view,/holiday_shop
2024-12-15T13:30:58Z,user202,page_view,/terms
2024-12-15T13:35:38Z,user202,page_view,/size_guide
2024-12-15T13:35:40Z,user101,api_call,/api/price_match
2024-12-15T13:40:18Z,user202,page_view,/gift_ideas
2024-12-15T13:45:05Z,user789,button_click,report_issue
2024-12-15T13:45:15Z,user303,button_click,accept_cookies
2024-12-15T13:50:55Z,user303,button_click,chat_with_support
2024-12-15T13:50:58Z,user202,page_view,/eco_friendly
2024-12-15T13:55:35Z,user303,button_click,play_product_video
2024-12-15T13:59:20Z,user101,api_call,/api/digital_wallet
2024-12-15T13:59:38Z,user202,page_view,/mobile_app
2024-12-15T13:59:55Z,user303,button_click,enable_notifications;

  for (const line of logs.split('\n')) {
    if (line.trim()) {
      yield line;
    }
  }
}

console.log(parseByHour(aggregatedOutput));
