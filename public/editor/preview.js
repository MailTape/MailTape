const PostPreview = createClass({
  render: function () {
    const { entry, widgetFor, getAsset } = this.props;

    const title = entry.getIn(['data', 'title']);
    const image = entry.getIn(['data', 'image']);
    const imageAsset = image ? getAsset(image) : null;

    return h(
      'div',
      {
        style: {
          padding: '20px',
          fontFamily: 'sans-serif',
        },
      },

      h(
        'h1',
        {
          'data-key-path': 'title',
          tabIndex: 0,
        },
        title || 'Untitled post'
      ),

      imageAsset &&
        h('img', {
          src: imageAsset.url,
          alt: 'Featured',
          style: {
            maxWidth: '100%',
            height: 'auto',
          },
        }),

      h(
        'div',
        {
          'data-key-path': 'body',
          style: {
            marginTop: '20px',
          },
        },
        widgetFor('body')
      )
    );
  },
});

CMS.registerPreviewTemplate('episodes', PostPreview);
