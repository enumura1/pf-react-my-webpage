import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import Intro from '../components/Intro';

test('bottom container check words', () => {
  render(<Intro />);
  const checkTextElement = screen.getByText('■ ABOUT ME');
  const checkTextElement2 = screen.getByText('エンジニア2年目 👨‍💻');
  const checkTextElement3 = screen.getByText('フロントエンドとモノづくり全般好きです。');
  const checkTextElement4 = screen.getByText('趣味でBlenderとReactをメインに触ってます。');
  const checkTextElement5 = screen.getByText('最近は自作キーボード・自作PC作ってみました。');
  const checkTextElement6 = screen.getByText('インフラから開発までフルスタックに強くなるのが目標です。');

  expect(checkTextElement).toBeInTheDocument();
  expect(checkTextElement2).toBeInTheDocument();
  expect(checkTextElement3).toBeInTheDocument();
  expect(checkTextElement4).toBeInTheDocument();
  expect(checkTextElement5).toBeInTheDocument();
  expect(checkTextElement6).toBeInTheDocument();
});
