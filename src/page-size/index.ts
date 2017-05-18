import { view, Component, Events, Store } from '@storefront/core';

@view('gb-page-size', require('./index.html'), require('./index.css'))
class PageSize extends Component {

  state: PageSize.State = {
    pageSizes: [],
    onSelect: (index) => this.flux.resize(this.state.pageSizes[index].value)
  };

  constructor() {
    super();
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

namespace PageSize {
  export interface State {
    pageSizes: Array<{
      value: number,
      label: number,
      selected?: boolean
    }>;
    onSelect(index: number): void;
  }
}

export default PageSize;
