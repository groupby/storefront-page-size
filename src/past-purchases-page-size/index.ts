import { alias, configurable, tag, Events, Selectors, Store, Tag } from '@storefront/core';
import { PageSize } from '../';

@alias('pageSize')
@tag('gb-past-purchases-page-size', require('./index.html'))
class PastPageSize extends PageSize {

  state: PageSize.State = {
    pageSizes: this.selectPageSizes(this.select(Selectors.pastPurchasePageSizes)),
    onSelect: (index) => this.actions.updatePastPurchasePageSize(this.state.pageSizes[index].value)
  };

  init() {
    this.flux.on(Events.PAST_PURCHASE_PAGE_SIZE_UPDATED, this.updatePageSizes);
  }
}

export default PastPageSize;
