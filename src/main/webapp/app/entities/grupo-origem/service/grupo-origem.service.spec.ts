import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IGrupoOrigem } from '../grupo-origem.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../grupo-origem.test-samples';

import { GrupoOrigemService } from './grupo-origem.service';

const requireRestSample: IGrupoOrigem = {
  ...sampleWithRequiredData,
};

describe('GrupoOrigem Service', () => {
  let service: GrupoOrigemService;
  let httpMock: HttpTestingController;
  let expectedResult: IGrupoOrigem | IGrupoOrigem[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(GrupoOrigemService);
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

    it('should create a GrupoOrigem', () => {
      const grupoOrigem = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(grupoOrigem).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a GrupoOrigem', () => {
      const grupoOrigem = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(grupoOrigem).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a GrupoOrigem', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of GrupoOrigem', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a GrupoOrigem', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addGrupoOrigemToCollectionIfMissing', () => {
      it('should add a GrupoOrigem to an empty array', () => {
        const grupoOrigem: IGrupoOrigem = sampleWithRequiredData;
        expectedResult = service.addGrupoOrigemToCollectionIfMissing([], grupoOrigem);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(grupoOrigem);
      });

      it('should not add a GrupoOrigem to an array that contains it', () => {
        const grupoOrigem: IGrupoOrigem = sampleWithRequiredData;
        const grupoOrigemCollection: IGrupoOrigem[] = [
          {
            ...grupoOrigem,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addGrupoOrigemToCollectionIfMissing(grupoOrigemCollection, grupoOrigem);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a GrupoOrigem to an array that doesn't contain it", () => {
        const grupoOrigem: IGrupoOrigem = sampleWithRequiredData;
        const grupoOrigemCollection: IGrupoOrigem[] = [sampleWithPartialData];
        expectedResult = service.addGrupoOrigemToCollectionIfMissing(grupoOrigemCollection, grupoOrigem);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(grupoOrigem);
      });

      it('should add only unique GrupoOrigem to an array', () => {
        const grupoOrigemArray: IGrupoOrigem[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const grupoOrigemCollection: IGrupoOrigem[] = [sampleWithRequiredData];
        expectedResult = service.addGrupoOrigemToCollectionIfMissing(grupoOrigemCollection, ...grupoOrigemArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const grupoOrigem: IGrupoOrigem = sampleWithRequiredData;
        const grupoOrigem2: IGrupoOrigem = sampleWithPartialData;
        expectedResult = service.addGrupoOrigemToCollectionIfMissing([], grupoOrigem, grupoOrigem2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(grupoOrigem);
        expect(expectedResult).toContain(grupoOrigem2);
      });

      it('should accept null and undefined values', () => {
        const grupoOrigem: IGrupoOrigem = sampleWithRequiredData;
        expectedResult = service.addGrupoOrigemToCollectionIfMissing([], null, grupoOrigem, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(grupoOrigem);
      });

      it('should return initial array if no GrupoOrigem is added', () => {
        const grupoOrigemCollection: IGrupoOrigem[] = [sampleWithRequiredData];
        expectedResult = service.addGrupoOrigemToCollectionIfMissing(grupoOrigemCollection, undefined, null);
        expect(expectedResult).toEqual(grupoOrigemCollection);
      });
    });

    describe('compareGrupoOrigem', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareGrupoOrigem(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareGrupoOrigem(entity1, entity2);
        const compareResult2 = service.compareGrupoOrigem(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareGrupoOrigem(entity1, entity2);
        const compareResult2 = service.compareGrupoOrigem(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareGrupoOrigem(entity1, entity2);
        const compareResult2 = service.compareGrupoOrigem(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
