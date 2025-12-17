import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRouter from '../AppRouter';
import { useAppStore } from '../store';

describe('flow guard', () => {
  it('redirects to intro when flag belum', async () => {
    useAppStore.setState({
      deviceId: 'test',
      flags: { introDone: false, permDone: false, profileDone: false, roomId: undefined },
      profile: { name: '', gender: 'skip', targetName: 'iPhone', targetAmount: 10000000 },
      room: undefined,
      partner: undefined,
    });

    render(
      <MemoryRouter initialEntries={[{ pathname: '/home' }]}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(await screen.findByText(/Gue Kucing lo/)).toBeInTheDocument();
  });
});
