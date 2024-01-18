import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITipoOrigem } from '../tipo-origem.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../tipo-origem.test-samples';

import { TipoOrigemService } from './tipo-origem.service';

const requireRestSample: ITipoOrigem = {
  ...sampleWithRequiredData,
};

describe('TipoOrigem Service', () => {
  let service: TipoOrigemService;
  let httpMock: HttpTestingController;
  let expectedResult: ITipoOrigem | ITipoOrigem[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TipoOrigemService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a TipoOrigem', () => {
      const tipoOrigem = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(tipoOrigem).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TipoOrigem', () => {
      const tipoOrigem = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(tipoOrigem).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TipoOrigem', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TipoOrigem', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a TipoOrigem', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTipoOrigemToCollectionIfMissing', () => {
      it('should add a TipoOrigem to an empty array', () => {
        const tipoOrigem: ITipoOrigem = sampleWithRequiredData;
        expectedResult = service.addTipoOrigemToCollectionIfMissing([], tipoOrigem);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tipoOrigem);
      });

      it('should not add a TipoOrigem to an array that contains it', () => {
        const tipoOrigem: ITipoOrigem = sampleWithRequiredData;
        const tipoOrigemCollection: ITipoOrigem[] = [
          {
            ...tipoOrigem,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTipoOrigemToCollectionIfMissing(tipoOrigemCollection, tipoOrigem);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TipoOrigem to an array that doesn't contain it", () => {
        const tipoOrigem: ITipoOrigem = sampleWithRequiredData;
        const tipoOrigemCollection: ITipoOrigem[] = [sampleWithPartialData];
        expectedResult = service.addTipoOrigemToCollectionIfMissing(tipoOrigemCollection, tipoOrigem);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tipoOrigem);
      });

      it('should add only unique TipoOrigem to an array', () => {
        const tipoOrigemArray: ITipoOrigem[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const tipoOrigemCollection: ITipoOrigem[] = [sampleWithRequiredData];
        expectedResult = service.addTipoOrigemToCollectionIfMissing(tipoOrigemCollection, ...tipoOrigemArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const tipoOrigem: ITipoOrigem = sampleWithRequiredData;
        const tipoOrigem2: ITipoOrigem = sampleWithPartialData;
        expectedResult = service.addTipoOrigemToCollectionIfMissing([], tipoOrigem, tipoOrigem2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tipoOrigem);
        expect(expectedResult).toContain(tipoOrigem2);
      });

      it('should accept null and undefined values', () => {
        const tipoOrigem: ITipoOrigem = sampleWithRequiredData;
        expectedResult = service.addTipoOrigemToCollectionIfMissing([], null, tipoOrigem, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tipoOrigem);
      });

      it('should return initial array if no TipoOrigem is added', () => {
        const tipoOrigemCollection: ITipoOrigem[] = [sampleWithRequiredData];
        expectedResult = service.addTipoOrigemToCollectionIfMissing(tipoOrigemCollection, undefined, null);
        expect(expectedResult).toEqual(tipoOrigemCollection);
      });
    });

    describe('compareTipoOrigem', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTipoOrigem(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTipoOrigem(entity1, entity2);
        const compareResult2 = service.compareTipoOrigem(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTipoOrigem(entity1, entity2);
        const compareResult2 = service.compareTipoOrigem(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTipoOrigem(entity1, entity2);
        const compareResult2 = service.compareTipoOrigem(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
