import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import Makes from '../components/Makes';

test('bottom container check words', () => {
  render(<Makes />);
  const checkTextElement = screen.getByText('📱スマホフレームApp（モバイルApp）');
  const checkTextElement2 = screen.getByText('・記事：CSS（box-shadow）生成ツールの制作を振り返って');
  const checkTextElement3 = screen.getByText('💻sticker-memopad-tool（chrome拡張）');
  const checkTextElement4 = screen.getByText('・記事：chrome拡張機能 をリリースしたので開発過程を振り返ってみた');
  const checkTextElement5 = screen.getByText('💻box shadow生成ツール（WebApp）');
  const checkTextElement6 = screen.getByText(
    '・記事：エンジニア１年目の初心者が約１か月でリリースしたモバイルアプリの制作過程',
  );

  expect(checkTextElement).toBeInTheDocument();
  expect(checkTextElement2).toBeInTheDocument();
  expect(checkTextElement3).toBeInTheDocument();
  expect(checkTextElement4).toBeInTheDocument();
  expect(checkTextElement5).toBeInTheDocument();
  expect(checkTextElement6).toBeInTheDocument();
});
