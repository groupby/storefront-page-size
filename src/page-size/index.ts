import { tag, Events, Store, Tag } from '@storefront/core';

@tag('gb-page-size', require('./index.html'))
class PageSize {

  state: PageSize.State = {
    pageSizes: [],
    onSelect: (index) => this.flux.resize(this.state.pageSizes[index].value)
  };

  init() {
    this.flux.on(Events.PAGE_SIZE_UPDATED, this.updatePageSizes);
  }

  onBeforeMount() {
    this.state = {
      ...this.state,
      pageSizes: this.selectPageSizes(this.flux.store.getState().data.page.sizes)
    };
    this.expose('pageSize');
  }

  updatePageSizes = (state: Store.SelectableList<number>) =>
    this.set({ pageSizes: this.selectPageSizes(state) })

  selectPageSizes(state: Store.SelectableList<number>) {
    return state.items.map((pageSize, index) => ({
      value: pageSize,
      label: pageSize,
      selected: index === state.selected
    }));
  }
}

interface PageSize extends Tag<any, PageSize.State> { }
namespace PageSize {
  export interface State {
    pageSizes: Option[];
    onSelect(index: number): void;
  }

  export interface Option {
    value: number;
    label: number;
    selected?: boolean;
  }
}

export default PageSize;
