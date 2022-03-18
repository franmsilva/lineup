import { TAuthError } from '@src/types/auth';

interface Ok<T> {
  readonly ok: true;
  readonly val: T;
}

interface Err<E> {
  readonly ok: false;
  readonly err: E;
}

type Result<T, E> = Ok<T> | Err<E>;

const createOk = <T>(val: T): Ok<T> => ({
  ok: true,
  val,
});

const createErr = <E>(err: E): Err<E> => ({
  ok: false,
  err,
});

export const isOk = <T, E>(val: Result<T, E>): val is Ok<T> => val.ok;

export const isErr = <T, E>(val: Result<T, E>): val is Err<E> =>
  val.ok === false;

export const handleFirebasePromise = async <TData>(
  promise: Promise<TData>
): Promise<Result<TData, TAuthError>> => {
  return promise
    .then((data: TData) => createOk(data))
    .catch((error: TAuthError) => Promise.resolve(createErr(error)));
};
