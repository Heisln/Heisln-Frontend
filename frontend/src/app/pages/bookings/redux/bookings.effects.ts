import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { UserService } from 'openapi';
import { EMPTY } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as BookingsActions from './bookings.actions';
import * as fromAuth from '../../../redux/redux-auth/auth.reducer';

@Injectable()
export class BookingEffects {
  loadMyBookings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookingsActions.loadMyBookings),
      withLatestFrom(this.store.select(fromAuth.selectCurrentUserId)),
      switchMap(([_type, userId]) => this.userService.apiV1UserUserIdBookingsGet(userId).pipe(
        map(bookings => BookingsActions.setMyBookings({ bookings })),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store
  ) { }
}