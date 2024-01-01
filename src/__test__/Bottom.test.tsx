import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import Bottom from '../components/Bottom';

test('bottom container check words', () => {
  render(<Bottom />);
  const checkTextElement = screen.getByText('最後までご覧いただきありがとうございます');
  const checkTextElement2 = screen.getByText('Thank you for watching to the end!');
  const checkTextElement3 = screen.getByText('©2023 enumura3d');

  expect(checkTextElement).toBeInTheDocument();
  expect(checkTextElement2).toBeInTheDocument();
  expect(checkTextElement3).toBeInTheDocument();
});
