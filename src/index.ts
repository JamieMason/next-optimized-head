import { Head as NextHead } from 'next/document';
import type { JSX } from 'react';

/**
 * An alternative to `<Head/>` from 'next/document' which sorts the elements in
 * the `<head>` to better match the recommendations in
 * https://github.com/rviscomi/capo.js.
 */
export class Head extends NextHead {
  render() {
    const metaCharSet: JSX.Element[] = [];
    const metaViewport: JSX.Element[] = [];
    const metaOthers: JSX.Element[] = [];
    const linkPreconnect: JSX.Element[] = [];
    const linkPreload: JSX.Element[] = [];
    const linkStylesheet: JSX.Element[] = [];
    const linkOthers: JSX.Element[] = [];
    const script: JSX.Element[] = [];
    const noscript: JSX.Element[] = [];
    const style: JSX.Element[] = [];
    const title: JSX.Element[] = [];
    const others: JSX.Element[] = [];

    const head = super.render();
    const children = head.props.children.flat().flatMap(withoutFragment).filter(Boolean);

    children.forEach((child: JSX.Element) => {
      const type = child.type;
      if (type === 'meta') {
        if (child.props.charSet) {
          metaCharSet.push(child);
        } else if (child.props.name === 'viewport') {
          metaViewport.push(child);
        } else {
          metaOthers.push(child);
        }
      } else if (type === 'link') {
        if (child.props.rel === 'preconnect') {
          linkPreconnect.push(child);
        } else if (child.props.rel === 'preload') {
          linkPreload.push(child);
        } else if (child.props.rel === 'stylesheet') {
          linkStylesheet.push(child);
        } else {
          linkOthers.push(child);
        }
      } else if (type === 'script') {
        script.push(child);
      } else if (type === 'noscript') {
        noscript.push(child);
      } else if (type === 'style') {
        style.push(child);
      } else if (type === 'title') {
        title.push(child);
      } else {
        others.push(child);
      }
    });

    return {
      ...head,
      props: {
        ...head.props,
        children: [
          ...metaCharSet,
          ...metaViewport,
          ...title,
          ...linkPreconnect,
          ...linkStylesheet,
          ...style,
          ...linkPreload,
          ...noscript,
          ...script,
          ...linkOthers,
          ...metaOthers,
          ...others,
        ],
      },
    };

    function withoutFragment(child: JSX.Element) {
      return Array.isArray(child?.props?.children)
        ? child.props.children.flatMap(withoutFragment)
        : child;
    }
  }
}
